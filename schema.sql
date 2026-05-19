-- ============================================================
-- ZELAN FURNITURE - Supabase Schema
-- Run this in your Supabase SQL editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- CATEGORIES
-- ============================================================
create table if not exists categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  name_am text,
  slug text unique not null,
  icon text,
  image_url text,
  display_order int default 0,
  created_at timestamptz default now()
);

-- ============================================================
-- PRODUCTS
-- ============================================================
create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  name_am text,
  slug text unique not null,
  description text,
  description_am text,
  category_id uuid references categories(id) on delete set null,
  price_tier int check (price_tier between 1 and 3) default 2,
  material text,
  style_tag text,
  status text check (status in ('in_stock', 'limited', 'made_to_order')) default 'in_stock',
  branch_available text[],
  is_featured bool default false,
  images text[],
  view_count int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- GALLERY IMAGES
-- ============================================================
create table if not exists gallery_images (
  id uuid primary key default uuid_generate_v4(),
  image_url text not null,
  room_type text,
  caption text,
  is_featured bool default false,
  created_at timestamptz default now()
);

-- ============================================================
-- INQUIRIES (contact form submissions)
-- ============================================================
create table if not exists inquiries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text,
  email text,
  area_of_interest text,
  message text,
  is_read bool default false,
  created_at timestamptz default now()
);

-- ============================================================
-- BRANCHES
-- ============================================================
create table if not exists branches (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text,
  address text,
  area text,
  hours text default 'Mon–Sat, 9:00 AM – 7:00 PM',
  map_embed_url text,
  created_at timestamptz default now()
);

-- ============================================================
-- HERO BANNERS
-- ============================================================
create table if not exists hero_banners (
  id uuid primary key default uuid_generate_v4(),
  image_url text,
  heading text,
  heading_am text,
  subheading text,
  subheading_am text,
  cta_text text default 'Shop Now',
  is_active bool default false,
  created_at timestamptz default now()
);

-- ============================================================
-- TESTIMONIALS
-- ============================================================
create table if not exists testimonials (
  id uuid primary key default uuid_generate_v4(),
  customer_name text not null,
  review text not null,
  rating int check (rating between 1 and 5) default 5,
  product_id uuid references products(id) on delete set null,
  is_visible bool default true,
  created_at timestamptz default now()
);

-- ============================================================
-- AUTO-UPDATE updated_at on products
-- ============================================================
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger products_updated_at
  before update on products
  for each row execute procedure update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table categories enable row level security;
alter table products enable row level security;
alter table gallery_images enable row level security;
alter table inquiries enable row level security;
alter table branches enable row level security;
alter table hero_banners enable row level security;
alter table testimonials enable row level security;

-- Public can read everything except inquiries
create policy "Public read categories" on categories for select using (true);
create policy "Public read products" on products for select using (true);
create policy "Public read gallery" on gallery_images for select using (true);
create policy "Public read branches" on branches for select using (true);
create policy "Public read active banners" on hero_banners for select using (is_active = true);
create policy "Public read visible testimonials" on testimonials for select using (is_visible = true);

-- Public can insert inquiries
create policy "Public insert inquiries" on inquiries for insert with check (true);

-- Authenticated (admin) can do everything
create policy "Admin all categories" on categories for all using (auth.role() = 'authenticated');
create policy "Admin all products" on products for all using (auth.role() = 'authenticated');
create policy "Admin all gallery" on gallery_images for all using (auth.role() = 'authenticated');
create policy "Admin all inquiries" on inquiries for all using (auth.role() = 'authenticated');
create policy "Admin all branches" on branches for all using (auth.role() = 'authenticated');
create policy "Admin all banners" on hero_banners for all using (auth.role() = 'authenticated');
create policy "Admin all testimonials" on testimonials for all using (auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA
-- ============================================================

-- Categories
insert into categories (name, name_am, slug, icon, display_order) values
  ('Bedroom', 'መኝታ ቤት', 'bedroom', '🛏️', 1),
  ('Living Room', 'መቀመጫ ክፍል', 'living-room', '🛋️', 2),
  ('Dining', 'መመገቢያ', 'dining', '🍽️', 3),
  ('Office', 'ቢሮ', 'office', '💼', 4),
  ('Storage', 'ማከማቻ', 'storage', '🗄️', 5);

-- Branches
insert into branches (name, phone, area, hours) values
  ('Meskel Flower', '0984272727', 'Meskel Flower, Addis Ababa', 'Mon–Sat, 9:00 AM – 7:00 PM'),
  ('Salitemeheret', '0969333333', 'Salitemeheret, Addis Ababa', 'Mon–Sat, 9:00 AM – 7:00 PM'),
  ('Bole Atlas', '0993858585', 'Bole Atlas, Addis Ababa', 'Mon–Sat, 9:00 AM – 7:00 PM'),
  ('Lebu', '0996656565', 'Lebu, Addis Ababa', 'Mon–Sat, 9:00 AM – 7:00 PM');

-- Hero banner
insert into hero_banners (heading, heading_am, subheading, subheading_am, cta_text, is_active) values
  (
    'Luxury Furniture Crafted for Modern Living',
    'ለዘመናዊ ኑሮ የተዘጋጀ የቅንጦት ቤት እቃ',
    'Discover premium furniture collections for every room in your home',
    'ለቤትዎ እያንዳንዱ ክፍል የተለዩ የቤት እቃዎችን ያግኙ',
    'Shop Now',
    true
  );

-- Sample testimonials
insert into testimonials (customer_name, review, rating, is_visible) values
  ('Meron T.', 'The bedroom set I ordered exceeded my expectations. Excellent quality and fast delivery!', 5, true),
  ('Dawit A.', 'Amazing customer service. They helped me pick the perfect living room set for my apartment.', 5, true),
  ('Sara B.', 'My office furniture arrived on time and looks stunning. Highly recommend Zelan!', 4, true);

-- ============================================================
-- increment_view RPC (called on product detail page)
-- ============================================================
create or replace function increment_view(product_id uuid)
returns void as $$
begin
  update products set view_count = view_count + 1 where id = product_id;
end;
$$ language plpgsql security definer;
