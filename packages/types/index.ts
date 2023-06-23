export type KioskDTO = {
  _id?: string;
  serialKey?: string;
  description?: string;
  isKioskClosed?: boolean;
  storeOpensAt?: Date;
  storeClosesAt?: Date;
};

export type Product = {
  id: string;
  description: string;
  price: number;
  image: string;
};

export type ProductCart = {
  product: Product;
  quantity: number;
};
