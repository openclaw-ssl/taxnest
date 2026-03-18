-- Waitlist table
create table if not exists waitlist (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  referral_code text unique not null,
  referred_by text references waitlist(referral_code),
  referral_count integer default 0,
  confirmed boolean default false,
  created_at timestamptz default now()
);

-- Index for referral lookup
create index if not exists idx_waitlist_referral_code on waitlist(referral_code);
create index if not exists idx_waitlist_email on waitlist(email);

-- RLS
alter table waitlist enable row level security;

-- Allow insert from anon (for waitlist signup)
create policy "allow_insert" on waitlist for insert to anon with check (true);

-- Allow read own row (for logged-in magic link users)
create policy "allow_read_own" on waitlist for select using (auth.email() = email);
