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

CREATE TYPE "product_brands" AS ENUM (
  'Everlast',
  'Ringside',
  'Venum',
  'Hayabusa',
  'Superare',
  'Fairtex',
  'Title'
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "users" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
  "username" varchar(40) UNIQUE NOT NULL,
  "password" varchar(60) NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS "products" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
  "name" varchar(100) UNIQUE NOT NULL,
  "size" product_sizes NOT NULL,
  "color" product_colors NOT NULL,
  "brand" product_brands NOT NULL,
  "description" varchar(1000)
);

CREATE TABLE IF NOT EXISTS "carts" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
  "user_id" uuid NOT NULL,
  "product_id" uuid NOT NULL,
  "quantity" integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS "orders" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
  "user_id" uuid UNIQUE NOT NULL,
  "cart_id" uuid UNIQUE NOT NULL,
  "order_date" timestamp NOT NULL,
  "is_gift" boolean DEFAULT false
);

CREATE UNIQUE INDEX ON "carts" USING BTREE ("user_id", "product_id");

CREATE INDEX ON "orders" USING BTREE ("order_date");

CREATE INDEX ON "orders" USING BTREE ("user_id");

ALTER TABLE "carts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "carts" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE;

ALTER TABLE "orders" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "orders" ADD FOREIGN KEY ("cart_id") REFERENCES "carts" ("id") ON DELETE CASCADE;

INSERT INTO users(username, password, created_at, updated_at) VALUES('admin', 'password', now(), now());