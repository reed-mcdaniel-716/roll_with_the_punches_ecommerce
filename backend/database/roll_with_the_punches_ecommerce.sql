DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS carts;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

DROP TYPE IF EXISTS product_sizes;
CREATE TYPE "product_sizes" AS ENUM (
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

DROP TYPE IF EXISTS product_colors;
CREATE TYPE "product_colors" AS ENUM (
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

DROP TYPE IF EXISTS product_brands;
CREATE TYPE "product_brands" AS ENUM (
  'Everlast',
  'Ringside',
  'Venum',
  'Hayabusa',
  'Superare',
  'Fairtex',
  'Title'
);

DROP TYPE IF EXISTS product_categories;
CREATE TYPE "product_categories" AS ENUM (
  'gloves',
  'wraps',
  'bag',
  't-shirt',
  'shorts',
  'hoodie'
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS "users" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
  "username" varchar(100) UNIQUE NOT NULL,
  "google_id" varchar(100),
  "created_at" timestamp NOT NULL DEFAULT NOW(),
  "updated_at" timestamp NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS "products" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
  "name" varchar(100) UNIQUE NOT NULL,
  "size" product_sizes NOT NULL,
  "color" product_colors NOT NULL,
  "brand" product_brands NOT NULL,
  "category" product_categories NOT NULL,
  "price" money NOT NULL DEFAULT 20.00,
  "description" varchar(1000)
);
CREATE TABLE IF NOT EXISTS "carts" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
  "user_id" uuid NOT NULL,
  "product_id" uuid NOT NULL,
  "quantity" integer NOT NULL DEFAULT 0,
  "checked_out" boolean NOT NULL DEFAULT FALSE
);
CREATE TABLE IF NOT EXISTS "orders" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
  "user_id" uuid NOT NULL,
  "cart_id_arr" uuid [] NOT NULL,
  "total_cost" money NOT NULL,
  "order_date" timestamp NOT NULL DEFAULT NOW(),
  "is_gift" boolean DEFAULT false
);
CREATE UNIQUE INDEX ON "carts" USING BTREE ("user_id", "product_id");
CREATE INDEX ON "orders" USING BTREE ("order_date");
CREATE INDEX ON "orders" USING BTREE ("user_id");
ALTER TABLE "carts"
ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;
ALTER TABLE "carts"
ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE;
ALTER TABLE "orders"
ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;
