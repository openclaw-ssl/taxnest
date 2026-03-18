import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

function generateReferralCode(): string {
  return crypto.randomUUID().replace(/-/g, '').slice(0, 8).toUpperCase()
}

export async function POST(request: Request) {
  let email: string

  try {
    const body = await request.json()
    email = body.email
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn('[Waitlist] Supabase env vars not set — skipping DB insert')
    const mockCode = generateReferralCode()
    return NextResponse.json({ referral_code: mockCode }, { status: 201 })
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  // Check for existing signup
  const { data: existing } = await supabase
    .from('waitlist')
    .select('referral_code')
    .eq('email', email)
    .single()

  if (existing) {
    return NextResponse.json(
      { referral_code: existing.referral_code, already_registered: true },
      { status: 200 }
    )
  }

  // Insert new row
  const referralCode = generateReferralCode()
  const { error: insertError } = await supabase
    .from('waitlist')
    .insert({ email, referral_code: referralCode })

  if (insertError) {
    // Handle unique constraint race condition
    if (insertError.code === '23505') {
      const { data: race } = await supabase
        .from('waitlist')
        .select('referral_code')
        .eq('email', email)
        .single()
      return NextResponse.json(
        { referral_code: race?.referral_code, already_registered: true },
        { status: 200 }
      )
    }
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 })
  }

  // Send welcome email
  const resendKey = process.env.RESEND_API_KEY
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const referralLink = `${baseUrl}/?ref=${referralCode}`

  if (resendKey) {
    const resend = new Resend(resendKey)
    await resend.emails.send({
      from: 'TaxNest <hello@taxnest.io>',
      to: email,
      subject: "You're on the TaxNest waitlist! 🎉",
      html: `
        <div style="font-family: Inter, Helvetica, Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 24px; color: #111827;">
          <h2 style="color: #1E3A5F; font-size: 24px; font-weight: 700; margin-bottom: 12px;">Welcome to TaxNest 🎉</h2>
          <p style="color: #6B7280; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            You're on our waitlist! We'll reach out as soon as early access opens.
          </p>
          <p style="color: #111827; font-size: 16px; font-weight: 600; margin-bottom: 8px;">Refer 3 friends for an extra month free:</p>
          <div style="background: #F8F9FB; border: 1px solid #E5E7EB; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
            <a href="${referralLink}" style="color: #3ECFCF; font-family: monospace; font-size: 14px; word-break: break-all;">${referralLink}</a>
          </div>
          <p style="color: #9CA3AF; font-size: 13px;">TaxNest · Invoice management for SMEs</p>
        </div>
      `,
    })
  } else {
    console.log(`[Waitlist] New signup: ${email} | referral_code: ${referralCode} | link: ${referralLink}`)
  }

  return NextResponse.json({ referral_code: referralCode }, { status: 201 })
}
