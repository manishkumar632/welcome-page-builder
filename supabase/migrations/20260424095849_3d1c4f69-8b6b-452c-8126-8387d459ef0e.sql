-- Fix function search_path
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin new.updated_at = now(); return new; end;
$$;

-- Tighten verifications insert policy
drop policy if exists "Anyone can create a verification" on public.verifications;

create policy "Verifications insert with safeguards"
  on public.verifications for insert
  to authenticated
  with check (
    -- must not self-attest
    (verifier_user_id is null or verifier_user_id <> subject_user_id)
    -- if signed in, the verifier_user_id (when set) must be the caller
    and (verifier_user_id is null or verifier_user_id = auth.uid())
    -- minimum identification of the verifier
    and verifier_name is not null and length(trim(verifier_name)) > 1
    and verifier_email is not null and length(trim(verifier_email)) > 3
    -- must be tied to an existing verification request
    and request_id is not null
    and exists (
      select 1 from public.verification_requests vr
      where vr.id = request_id
        and vr.user_id = subject_user_id
        and (vr.expires_at is null or vr.expires_at > now())
    )
  );