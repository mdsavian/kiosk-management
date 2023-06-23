import { atom } from "recoil";
import { ProductCart } from "types";

const cartState = atom({
  key: "cart",
  default: [] as ProductCart[],
});

export default cartState;
