import * as React from "react";
import products from "../assets/products/products";

const ProductsPage: React.FC = () => {
  return (
    <>
      <button className="rounded-full bg-emerald-500 p-2 mt-5">Go To cart</button>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div className="border border-black p-2 ">
            <img className="object-contain h-56 w-96" src={product.image}></img>

            <h3 className="mt-2 text-center">{product.description}</h3>
            <h4 className="mt-2 text-center">R$ {product.price}</h4>

            <input
              type="number"
              className="w-full text-center mt-2 border"
              placeholder="Quantity"
            />

            <button className="rounded-full bg-emerald-300 p-2 mt-3">Add to cart</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductsPage;
