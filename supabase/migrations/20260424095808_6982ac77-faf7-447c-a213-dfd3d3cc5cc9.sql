-- =========================================================
-- Protobloc core schema
-- =========================================================

-- 1. PROFILES ---------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  headline text,
  bio text,
  avatar_url text,
  location text,
  github_url text,
  linkedin_url text,
  website_url text,
  open_to_work boolean not null default false,
  trust_score integer not null default 0,
  profile_completion integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index profiles_trust_score_idx on public.profiles (trust_score desc);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by authenticated users"
  on public.profiles for select
  to authenticated
  using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Users can delete their own profile"
  on public.profiles for delete
  to authenticated
  using (auth.uid() = id);

-- 2. WORK EXPERIENCES -------------------------------------------------------
create table public.work_experiences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  company text not null,
  title text not null,
  location text,
  start_date date not null,
  end_date date,
  is_current boolean not null default false,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index work_experiences_user_id_idx on public.work_experiences (user_id);

alter table public.work_experiences enable row level security;

create policy "Work experiences viewable by authenticated"
  on public.work_experiences for select to authenticated using (true);
create policy "Users insert own work experience"
  on public.work_experiences for insert to authenticated with check (auth.uid() = user_id);
create policy "Users update own work experience"
  on public.work_experiences for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users delete own work experience"
  on public.work_experiences for delete to authenticated using (auth.uid() = user_id);

-- 3. EDUCATIONS -------------------------------------------------------------
create table public.educations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  school text not null,
  degree text,
  field text,
  start_date date,
  end_date date,
  transcript_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index educations_user_id_idx on public.educations (user_id);

alter table public.educations enable row level security;
create policy "Educations viewable by authenticated"
  on public.educations for select to authenticated using (true);
create policy "Users insert own education"
  on public.educations for insert to authenticated with check (auth.uid() = user_id);
create policy "Users update own education"
  on public.educations for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users delete own education"
  on public.educations for delete to authenticated using (auth.uid() = user_id);

-- 4. SKILLS (catalog) -------------------------------------------------------
create table public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);
alter table public.skills enable row level security;
create policy "Skills readable by authenticated"
  on public.skills for select to authenticated using (true);
-- writes restricted (no policy = denied for non-service role)

-- 5. USER_SKILLS ------------------------------------------------------------
create table public.user_skills (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  skill_id uuid not null references public.skills(id) on delete cascade,
  endorsement_count integer not null default 0,
  created_at timestamptz not null default now(),
  unique (user_id, skill_id)
);
create index user_skills_user_id_idx on public.user_skills (user_id);

alter table public.user_skills enable row level security;
create policy "User skills viewable by authenticated"
  on public.user_skills for select to authenticated using (true);
create policy "Users insert own user_skills"
  on public.user_skills for insert to authenticated with check (auth.uid() = user_id);
create policy "Users delete own user_skills"
  on public.user_skills for delete to authenticated using (auth.uid() = user_id);

-- 6. VERIFICATION_REQUESTS --------------------------------------------------
create table public.verification_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  work_experience_id uuid references public.work_experiences(id) on delete cascade,
  token text not null unique default encode(gen_random_bytes(18), 'hex'),
  note text,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);
create index verification_requests_user_id_idx on public.verification_requests (user_id);

alter table public.verification_requests enable row level security;
create policy "Users see own verification requests"
  on public.verification_requests for select to authenticated using (auth.uid() = user_id);
create policy "Users create own verification requests"
  on public.verification_requests for insert to authenticated with check (auth.uid() = user_id);
create policy "Users delete own verification requests"
  on public.verification_requests for delete to authenticated using (auth.uid() = user_id);

-- 7. VERIFICATIONS ----------------------------------------------------------
create table public.verifications (
  id uuid primary key default gen_random_uuid(),
  request_id uuid references public.verification_requests(id) on delete set null,
  subject_user_id uuid not null references auth.users(id) on delete cascade,
  verifier_user_id uuid references auth.users(id) on delete set null,
  verifier_name text,
  verifier_email text,
  verifier_company text,
  relationship text,
  worked_together boolean,
  overlap_start date,
  overlap_end date,
  confidence smallint check (confidence between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);
create index verifications_subject_idx on public.verifications (subject_user_id);

alter table public.verifications enable row level security;
create policy "Verifications viewable by authenticated"
  on public.verifications for select to authenticated using (true);
create policy "Anyone can create a verification"
  on public.verifications for insert to authenticated with check (true);
create policy "Verifier can update own verification"
  on public.verifications for update to authenticated
  using (verifier_user_id is not null and auth.uid() = verifier_user_id)
  with check (verifier_user_id is not null and auth.uid() = verifier_user_id);
create policy "Verifier can delete own verification"
  on public.verifications for delete to authenticated
  using (verifier_user_id is not null and auth.uid() = verifier_user_id);

-- =========================================================
-- Auto-create a profile on signup
-- =========================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- updated_at helpers
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger set_updated_at_profiles before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger set_updated_at_work before update on public.work_experiences
  for each row execute function public.set_updated_at();
create trigger set_updated_at_edu before update on public.educations
  for each row execute function public.set_updated_at();