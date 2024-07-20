DROP TABLE IF EXISTS roll_with_the_punches.orders;
DROP TABLE IF EXISTS roll_with_the_punches.carts;
DROP TABLE IF EXISTS roll_with_the_punches.products;
DROP TABLE IF EXISTS roll_with_the_punches.users;

DROP TYPE IF EXISTS roll_with_the_punches.product_sizes;
CREATE TYPE roll_with_the_punches.product_sizes AS ENUM (
  '10oz',
  '12oz',
  '14oz',
  '16oz',
  '108in',
  '120in',
  '180in',
  'xs',
  'sm',
  'med',
  'lg',
  'xl',
  'xxl',
  'xxxl'
);

DROP TYPE IF EXISTS roll_with_the_punches.product_colors;
CREATE TYPE roll_with_the_punches.product_colors AS ENUM (
  'black',
  'red',
  'blue',
  'leather brown',
  'gray',
  'white',
  'green',
  'gold',
  'silver',
  'pink',
  'purple'
);

DROP TYPE IF EXISTS roll_with_the_punches.product_brands;
CREATE TYPE roll_with_the_punches.product_brands AS ENUM (
  'Everlast',
  'Ringside',
  'Venum',
  'Hayabusa',
  'Superare',
  'Fairtex',
  'Title'
);

DROP TYPE IF EXISTS roll_with_the_punches.product_categories;
CREATE TYPE roll_with_the_punches.product_categories AS ENUM (
  'gloves',
  'wraps',
  'bag',
  't-shirt',
  'shorts',
  'hoodie'
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS roll_with_the_punches.users (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
  "username" varchar(100) UNIQUE NOT NULL,
  "google_id" varchar(100),
  "created_at" timestamp NOT NULL DEFAULT NOW(),
  "updated_at" timestamp NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS roll_with_the_punches.products (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
  "name" varchar(100) UNIQUE NOT NULL,
  "size" product_sizes NOT NULL,
  "color" product_colors NOT NULL,
  "brand" product_brands NOT NULL,
  "category" product_categories NOT NULL,
  "price" money NOT NULL DEFAULT 20.00,
  "description" varchar(1000)
);
CREATE TABLE IF NOT EXISTS roll_with_the_punches.carts (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
  "user_id" uuid NOT NULL,
  "product_id" uuid NOT NULL,
  "quantity" integer NOT NULL DEFAULT 0,
  "checked_out" boolean NOT NULL DEFAULT FALSE
);
CREATE TABLE IF NOT EXISTS roll_with_the_punches.orders (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
  "user_id" uuid NOT NULL,
  "cart_id_arr" uuid [] NOT NULL,
  "total_cost" money NOT NULL,
  "order_date" timestamp NOT NULL DEFAULT NOW(),
  "is_gift" boolean DEFAULT false
);
CREATE UNIQUE INDEX ON roll_with_the_punches.carts USING BTREE ("user_id", "product_id");
CREATE INDEX ON roll_with_the_punches.orders USING BTREE ("order_date");
CREATE INDEX ON roll_with_the_punches.orders USING BTREE ("user_id");
ALTER TABLE roll_with_the_punches.carts
ADD FOREIGN KEY ("user_id") REFERENCES roll_with_the_punches.users ("id") ON DELETE CASCADE;
ALTER TABLE roll_with_the_punches.carts
ADD FOREIGN KEY ("product_id") REFERENCES roll_with_the_punches.products ("id") ON DELETE CASCADE;
ALTER TABLE roll_with_the_punches.orders
ADD FOREIGN KEY ("user_id") REFERENCES roll_with_the_punches.users ("id") ON DELETE CASCADE;
