import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Basket from "./Basket/Basket";
import Main from "./Menu/Main";

function Menu() {
  const [cartItems, setCartItems] = useState([]);
  const onAdd = (item) => {
   
    const itemExists = cartItems.find((x) => x.item_id === item.item_id);
    if (itemExists) {
      setCartItems(
        cartItems.map((x) =>
          x.item_id === item.item_id
            ? { ...itemExists, qty: itemExists.qty + 1 }
            : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, qty: 1 }]);
    }
  };

  const onRemove = (item) => {
    const itemExists = cartItems.find((x) => x.item_id === item.item_id);
    if (itemExists.qty === 1) {
      setCartItems(cartItems.filter((x) => x.item_id !== item.item_id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.item_id === item.item_id
            ? { ...itemExists, qty: itemExists.qty - 1 }
            : x
        )
      );
    }
  };
  return (
    <>
      <div className="row">
        <Navbar/>
        <Main onAdd={onAdd}></Main>
        <Basket
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
        ></Basket>
      </div>
    </>
  );
}

export default Menu;
