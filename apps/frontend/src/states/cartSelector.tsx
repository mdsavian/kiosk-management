import { selector } from "recoil";
import cartState from "./cartState";

const cartTotalState = selector({
  key: "cartTotalState",
  get: ({ get }) => {
    const cartProducts = get(cartState);

    let totalCart = 0;

    const products = cartProducts.map((prod) => {
      const totalProduct = prod.product.price * prod.quantity;
      totalCart += totalProduct;

      return { ...prod, totalProduct };
    });

    return { totalCart, products };
  },
});

export default cartTotalState;
