import React, { useEffect, useState } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import { addToDb, getShoppingCart } from "../../utilities/fakedb";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const storedCard = getShoppingCart();
    const savedCart = [];

    if (products.length > 0) {
      // step 1: get id of storedCard
      for (const id in storedCard) {
        // step 2: get product from products state by using id
        const addedProduct = products.find((product) => product.id === id);
        if (addedProduct) {
          //step 3: add product
          const quantity = storedCard[id];
          addedProduct.quantity = quantity;
          //step 4: add the addedProduct to the savedCart
          savedCart.push(addedProduct);
        }
        console.log("addedProduct", addedProduct);
      }
    }
    //set the cart
    setCart(savedCart);
  }, [products]);

  const handleAddToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    addToDb(product.id);
  };

  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>

      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
