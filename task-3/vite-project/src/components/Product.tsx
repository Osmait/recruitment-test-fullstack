import React from "react";
import useBudget from "../hooks/useBudget";
import logo from "../assets/61wbV8oqAbL.jpg";

export interface producInterface {
  id: number;
  Product_name: string;
  description: string;
  price: number;
  Product_Image: string;
}

export const Product = () => {
  const { product } = useBudget();

  return (
    <>
      <h1>Productos</h1>

      <div className="product-container">
        {product.map((p: producInterface) => (
          <div className="product" key={p.id}>
            <h2 className="subtitulo">{p.Product_name}</h2>

            <div className="imagen">
              <img src={logo} />
            </div>
            <p>${p.price}</p>

            <p>{p.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};
