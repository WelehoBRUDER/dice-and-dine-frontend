/**
 * CartContext.jsx
 * @description This file contains the CartContext and CartProvider components.
 * The CartContext is used to manage the shopping cart state in the application.
 * The CartProvider component wraps the application and provides the cart state and functions to manipulate it.
 * It uses the useContext and useState hooks from React to manage the cart state.
 * The cart state is stored in local storage to persist the cart data across page reloads.
 * The CartProvider component provides the following functions:
 * - addToCart: Adds an item to the cart or increases the quantity if it already exists.
 * - removeFromCart: Decreases the quantity of an item in the cart or removes it if the quantity is 1.
 * - clearCart: Clears the entire cart.

 */

import {createContext, useContext, useState, useEffect} from "react";

const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    return savedCart || [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (menuItemId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.menu_item_id === menuItemId
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.menu_item_id === menuItemId
            ? {...item, amount: item.amount + 1}
            : item
        );
      } else {
        return [...prevCart, {menu_item_id: menuItemId, amount: 1}];
      }
    });
  };

  const removeFromCart = (menuItemId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.menu_item_id === menuItemId
      );

      if (existingItem && existingItem.amount > 1) {
        return prevCart.map((item) =>
          item.menu_item_id === menuItemId
            ? {...item, amount: item.amount - 1}
            : item
        );
      } else {
        return prevCart.filter((item) => item.menu_item_id !== menuItemId);
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
