alter table public.profiles enable row level security;
alter table public.assets enable row level security;
alter table public.payment_requests enable row level security;
alter table public.profile_events enable row level security;
alter table public.help_articles enable row level security;

create policy "public profiles are readable" on public.profiles for select using (visibility = 'public');
create policy "owners can manage own profile" on public.profiles for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "owners can read own assets" on public.assets for select using (auth.uid() = user_id);
create policy "owners can insert own assets" on public.assets for insert with check (auth.uid() = user_id);
create policy "owners can delete own assets" on public.assets for delete using (auth.uid() = user_id);

create policy "owners can read own payments" on public.payment_requests for select using (auth.uid() = user_id);
create policy "owners can create own payments" on public.payment_requests for insert with check (auth.uid() = user_id);

create policy "public help articles" on public.help_articles for select using (published = true);

create policy "public events insert only" on public.profile_events for insert with check (true);
