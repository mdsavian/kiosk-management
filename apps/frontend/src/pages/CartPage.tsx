import * as React from "react";
import { useRecoilValue } from "recoil";
import cartTotalState from "../states/cartSelector";

const CartPage: React.FC = () => {
  const cartProducts = useRecoilValue(cartTotalState);

  return (
    <>
      <h1 className="font-extrabold mb-4 text-4xl">
        Total Cart: R$ {(Math.round(cartProducts.totalCart * 100) / 100).toFixed(2)}
      </h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th></th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartProducts.products.map((productCart) => {
            return (
              <tr key={productCart.product.id}>
                <td>
                  <img className="object-contain h-24 w-24" src={productCart.product.image} />
                </td>

                <td>{productCart.product.description}</td>

                <td>R$ {(Math.round(productCart.product.price * 100) / 100).toFixed(2)}</td>

                <td>{productCart.quantity}</td>
                <td>R$ {(Math.round(productCart.totalProduct * 100) / 100).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default CartPage;
