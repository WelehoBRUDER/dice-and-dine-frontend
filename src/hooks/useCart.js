import {useState, useEffect} from "react";

const useCart = () => {
  // Initialize cart state from localStorage or set to an empty array
  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    return savedCart || [];
  });

  // Save the cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (menuItemId) => {
    setCart((prevCart) => {
      if (prevCart.includes(menuItemId)) {
        return prevCart; // Item already in cart, don't add again
      }
      return [...prevCart, menuItemId]; // Add item to cart
    });
  };

  // Remove item from cart
  const removeFromCart = (menuItemId) => {
    setCart((prevCart) => prevCart.filter((id) => id !== menuItemId));
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };

  return {cart, addToCart, removeFromCart, clearCart};
};

export default useCart;
