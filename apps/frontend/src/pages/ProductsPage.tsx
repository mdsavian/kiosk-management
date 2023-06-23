import * as React from "react";
import products from "../assets/products/products";
import { useRecoilState } from "recoil";
import cartState from "../states/cartState";
import ProductCard from "../components/ProductCard";
import { Product } from "types";
import { useNavigate } from "react-router-dom";

const ProductsPage: React.FC = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const navigate = useNavigate();

  const handleAddToCart = (product: Product, quantity: number) => {
    const cartProduct = cart.find((c) => c.product.id === product.id);
    if (cartProduct) {
      const newList = cart.map((cartProd) =>
        cartProd.product.id === product.id
          ? { ...cartProd, quantity: cartProd.quantity + quantity }
          : cartProd
      );

      setCart(newList);
    } else {
      setCart((oldList) => [...oldList, { quantity, product: product }]);
    }
  };

  return (
    <>
      <button className="rounded-full bg-emerald-500 p-2 mt-5" onClick={() => navigate("/cart")}>
        Go To cart
      </button>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} handleAddToCart={handleAddToCart} />
        ))}
      </div>
    </>
  );
};

export default ProductsPage;
