export type KioskDTO = {
  _id: string;
  serialKey: string;
  description: string;
  isKioskClosed: boolean;
  storeOpensAt: Date;
  storeClosesAt: Date;
};
