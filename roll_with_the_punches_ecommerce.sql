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

CREATE TABLE "users" (
  "id" uuid UNIQUE PRIMARY KEY NOT NULL,
  "username" varchar(40) UNIQUE NOT NULL,
  "password" varchar(60) NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp NOT NULL
);

CREATE TABLE "products" (
  "id" uuid UNIQUE PRIMARY KEY NOT NULL,
  "name" varchar(100) UNIQUE NOT NULL,
  "size" product_sizes NOT NULL,
  "color" product_colors NOT NULL,
  "brand" product_brands NOT NULL,
  "description" varchar(1000)
);

CREATE TABLE "carts" (
  "id" uuid NOT NULL,
  "product_id" uuid NOT NULL,
  "quantity" integer NOT NULL DEFAULT 0,
  PRIMARY KEY ("id", "product_id")
);

CREATE TABLE "orders" (
  "id" uuid UNIQUE PRIMARY KEY NOT NULL,
  "user_id" uuid NOT NULL,
  "cart_id" uuid NOT NULL,
  "order_date" timestamp NOT NULL,
  "is_gift" boolean DEFAULT false
);

CREATE INDEX ON "orders" ("user_id");

CREATE TABLE "products_carts" (
  "products_id" uuid,
  "carts_product_id" uuid,
  PRIMARY KEY ("products_id", "carts_product_id")
);

ALTER TABLE "products_carts" ADD FOREIGN KEY ("products_id") REFERENCES "products" ("id");

ALTER TABLE "products_carts" ADD FOREIGN KEY ("carts_product_id") REFERENCES "carts" ("product_id");


ALTER TABLE "orders" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("cart_id") REFERENCES "carts" ("id");
