enum productSizes {
  "10oz",
  "12oz",
  "14oz",
  "16oz",
  "108in",
  "120in",
  "180in",
  "xs",
  "sm",
  "med",
  "lg",
  "xl",
  "xxl",
  "xxxl",
}

export enum productColors {
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
}

enum productBrands {
  "Everlast",
  "Ringside",
  "Venum",
  "Hayabusa",
  "Superare",
  "Fairtex",
  "Title",
}

enum productDescriptor {
  "Challenger",
  "Heavyweight",
  "Champion",
  "2.0",
  "3.0",
  "Deluxe",
  "Premium",
  "Classic",
  "Pro",
  "Training",
}

module.exports = {
  productBrands,
  productColors,
  productSizes,
  productDescriptor,
};
