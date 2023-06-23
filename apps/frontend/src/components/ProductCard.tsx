import * as React from "react";
import { Product } from "types";

type Props = {
  product: Product;
  handleAddToCart: (product: Product, quantity: number) => void;
};
const ProductCard: React.FC<Props> = ({ product, handleAddToCart }) => {
  const [quantity, setQuantity] = React.useState(1);

  return (
    <div className="border border-black p-2 ">
      <img className="object-contain h-56 w-96" src={product.image}></img>

      <h3 className="mt-2 text-center">{product.description}</h3>
      <h4 className="mt-2 text-center">R$ {(Math.round(product.price * 100) / 100).toFixed(2)}</h4>

      <input
        type="number"
        className="w-full text-center mt-2 border"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />

      <button
        className="rounded-full bg-emerald-300 p-2 mt-3"
        onClick={() => handleAddToCart(product, quantity)}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
