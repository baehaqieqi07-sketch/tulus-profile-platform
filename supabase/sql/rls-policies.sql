-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.social_links enable row level security;
alter table public.badges enable row level security;
alter table public.quotes enable row level security;
alter table public.gallery_items enable row level security;
alter table public.subscriptions enable row level security;
alter table public.payments enable row level security;
alter table public.reports enable row level security;
alter table public.analytics_events enable row level security;
alter table public.user_roles enable row level security;
alter table public.activity_logs enable row level security;
alter table public.platform_settings enable row level security;

-- Profiles
create policy "public can read visible profiles" on public.profiles for select using (visibility = 'public' and is_suspended = false);
create policy "users can read own profile" on public.profiles for select using (auth.uid() = user_id);
create policy "users can insert own profile" on public.profiles for insert with check (auth.uid() = user_id);
create policy "users can update own profile" on public.profiles for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "owners can manage profiles" on public.profiles for all using (public.is_owner(auth.uid())) with check (public.is_owner(auth.uid()));

-- Child profile data: public can read when parent profile is public.
create policy "public read active links" on public.social_links for select using (is_active = true and exists(select 1 from public.profiles p where p.user_id = social_links.user_id and p.visibility = 'public' and p.is_suspended = false));
create policy "users manage own links" on public.social_links for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "owners manage links" on public.social_links for all using (public.is_owner(auth.uid())) with check (public.is_owner(auth.uid()));

create policy "public read active badges" on public.badges for select using (is_active = true and exists(select 1 from public.profiles p where p.user_id = badges.user_id and p.visibility = 'public' and p.is_suspended = false));
create policy "users manage own badges" on public.badges for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "owners manage badges" on public.badges for all using (public.is_owner(auth.uid())) with check (public.is_owner(auth.uid()));

create policy "public read active quotes" on public.quotes for select using (is_active = true and exists(select 1 from public.profiles p where p.user_id = quotes.user_id and p.visibility = 'public' and p.is_suspended = false));
create policy "users manage own quotes" on public.quotes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "owners manage quotes" on public.quotes for all using (public.is_owner(auth.uid())) with check (public.is_owner(auth.uid()));

create policy "public read active gallery" on public.gallery_items for select using (is_active = true and exists(select 1 from public.profiles p where p.user_id = gallery_items.user_id and p.visibility = 'public' and p.is_suspended = false));
create policy "users manage own gallery" on public.gallery_items for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "owners manage gallery" on public.gallery_items for all using (public.is_owner(auth.uid())) with check (public.is_owner(auth.uid()));

-- Subscriptions and payments
create policy "users read own subscription" on public.subscriptions for select using (auth.uid() = user_id);
create policy "owners manage subscriptions" on public.subscriptions for all using (public.is_owner(auth.uid())) with check (public.is_owner(auth.uid()));

create policy "users read own payments" on public.payments for select using (auth.uid() = user_id);
create policy "users create own payments" on public.payments for insert with check (auth.uid() = user_id and status in ('draft','pending'));
create policy "owners manage payments" on public.payments for all using (public.is_owner(auth.uid())) with check (public.is_owner(auth.uid()));

-- Reports
create policy "any auth user can create report" on public.reports for insert with check (auth.uid() = reporter_user_id or reporter_user_id is null);
create policy "moderators read reports" on public.reports for select using (public.is_moderator(auth.uid()));
create policy "moderators update reports" on public.reports for update using (public.is_moderator(auth.uid())) with check (public.is_moderator(auth.uid()));

-- Analytics
create policy "users read own analytics" on public.analytics_events for select using (auth.uid() = user_id);
create policy "public can insert safe analytics" on public.analytics_events for insert with check (event_type in ('profile_view','link_click'));
create policy "owners read analytics" on public.analytics_events for select using (public.is_owner(auth.uid()));

-- Roles and logs
create policy "users can read own roles" on public.user_roles for select using (auth.uid() = user_id);
create policy "owners manage roles" on public.user_roles for all using (public.is_owner(auth.uid())) with check (public.is_owner(auth.uid()));

create policy "owners read activity logs" on public.activity_logs for select using (public.is_owner(auth.uid()));
create policy "service or owner insert logs" on public.activity_logs for insert with check (public.is_owner(auth.uid()) or auth.uid() is not null);

create policy "owners manage settings" on public.platform_settings for all using (public.is_owner(auth.uid())) with check (public.is_owner(auth.uid()));
create policy "public read safe settings" on public.platform_settings for select using (key in ('public_theme_list','pricing_public'));

-- Music recommendations RLS
alter table public.music_recommendations enable row level security;

drop policy if exists "active music recommendations are readable" on public.music_recommendations;
create policy "active music recommendations are readable"
  on public.music_recommendations for select
  using (is_active = true);

drop policy if exists "owners manage music recommendations" on public.music_recommendations;
create policy "owners manage music recommendations"
  on public.music_recommendations for all
  using (public.is_owner(auth.uid()))
  with check (public.is_owner(auth.uid()));
