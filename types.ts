enum productSizes {
  ten = "10oz",
  twelve = "12oz",
  fourteen = "14oz",
  sixteen = "16oz",
  oneoheight = "108in",
  onetwenty = "120in",
  oneeighty = "180in",
  xs = "xs",
  sm = "sm",
  med = "med",
  lg = "lg",
  xl = "xl",
  xxl = "xxl",
  xxxl = "xxxl",
}

export enum productColors {
  black = "black",
  red = "red",
  blue = "blue",
  leatherbrown = "leather brown",
  gray = "gray",
  white = "white",
  green = "green",
  gold = "gold",
  silver = "silver",
  pink = "pink",
  purple = "purple",
}

enum productBrands {
  everlast = "Everlast",
  ringside = "Ringside",
  venum = "Venum",
  hayabusa = "Hayabusa",
  superare = "Superare",
  fairtex = "Fairtex",
  title = "Title",
}

enum productDescriptor {
  challenger = "Challenger",
  heavyweight = "Heavyweight",
  champion = "Champion",
  two = "2.0",
  three = "3.0",
  deluxe = "Deluxe",
  premium = "Premium",
  classic = "Classic",
  pro = "Pro",
  training = "Training",
}

module.exports = {
  productBrands,
  productColors,
  productSizes,
  productDescriptor,
};
