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
