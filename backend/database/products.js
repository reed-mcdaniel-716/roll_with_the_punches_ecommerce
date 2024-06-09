const db = require("./db");
const { faker } = require("@faker-js/faker");

const productBrands = [
  "Everlast",
  "Ringside",
  "Venum",
  "Hayabusa",
  "Superare",
  "Fairtex",
  "Title",
];

const gloveSizes = ["10oz", "12oz", "14oz", "16oz"];

const wrapLengths = ["108in", "120in", "180in"];

const apparelSizes = ["xs", "sm", "med", "lg", "xl", "xxl", "xxxl"];

const apparelTypes = ["t-shirt", "shorts", "hoodie"];

const productColors = [
  "black",
  "red",
  "blue",
  "leather brown",
  "gray",
  "white",
  "green",
  "gold",
  "silver",
  "pink",
  "purple",
];

const productDescriptor = [
  "Champion",
  "Premium",
  "2.0",
  "3.0",
  "Elite",
  "Sparring",
];

// PRODUCTS

const main = async () => {
  // Gloves
  for (let i = 0; i < 10; i++) {
    const brand = faker.helpers.arrayElement(productBrands);
    const descriptor = faker.helpers.arrayElement(productDescriptor);
    const name = `${brand} ${descriptor} gloves`;
    const size = faker.helpers.arrayElement(gloveSizes);
    const color = faker.helpers.arrayElement(productColors);
    const description = `${brand}'s ${size} ${descriptor} gloves in ${color}`;
    const price = faker.commerce.price({ min: 60, max: 200 });
    await db.createProduct(
      name,
      size,
      color,
      brand,
      price,
      description,
      "gloves"
    );
  }

  // Wraps
  for (let i = 0; i < 10; i++) {
    const brand = faker.helpers.arrayElement(productBrands);
    const descriptor = faker.helpers.arrayElement(productDescriptor);
    const name = `${brand} ${descriptor} wraps`;
    const size = faker.helpers.arrayElement(wrapLengths);
    const color = faker.helpers.arrayElement(productColors);
    const description = `${brand}'s ${size} ${descriptor} wraps in ${color}`;
    const price = faker.commerce.price({ min: 10, max: 40 });
    await db.createProduct(
      name,
      size,
      color,
      brand,
      price,
      description,
      "wraps"
    );
  }

  // Apparel

  for (let i = 0; i < 10; i++) {
    const brand = faker.helpers.arrayElement(productBrands);
    const descriptor = faker.helpers.arrayElement(productDescriptor);
    const apparelType = faker.helpers.arrayElement(apparelTypes);
    const name = `${brand} ${descriptor} ${apparelType}`;
    const size = faker.helpers.arrayElement(apparelSizes);
    const color = faker.helpers.arrayElement(productColors);
    const description = `${brand}'s ${size} ${apparelType} ${descriptor} in ${color}`;
    const price = faker.commerce.price({ min: 20, max: 80 });
    await db.createProduct(
      name,
      size,
      color,
      brand,
      price,
      description,
      apparelType
    );
  }

  // Bags

  for (let i = 0; i < 10; i++) {
    const brand = faker.helpers.arrayElement(productBrands);
    const descriptor = faker.helpers.arrayElement(productDescriptor);
    const name = `${brand} ${descriptor} bag`;
    const size = "xl";
    const color = faker.helpers.arrayElement(productColors);
    const description = `${brand}'s ${size} bag ${descriptor} in ${color}`;
    const price = faker.commerce.price({ min: 20, max: 80 });
    await db.createProduct(name, size, color, brand, price, description, "bag");
  }
};

main();
