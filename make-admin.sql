-- 1) Open Authentication → Users → copy UUID for gehe1@yandex.ru
-- 2) Paste UUID below and Run

insert into public.profiles (id, email, role)
values (
  'PASTE-USER-UUID-HERE',
  'gehe1@yandex.ru',
  'admin'
)
on conflict (id) do update
  set role = 'admin',
      email = excluded.email;

-- Optional: auto-create profile for future signups
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
