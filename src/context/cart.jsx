import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartContext({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (shoe) => {
    // Primero verificamos de que el zapato ya este en el carrito
    const shoeInCartIndex = cart.findIndex((item) => item.id === cart.id);

    if (shoeInCartIndex >= 0) {
      const newCart = structuredClone(cart);
      newCart[shoeInCartIndex].cantidad += 1;
      return setCart(newCart);
    }

    // El zapato no esta en el carrito
    setCart((prevState) => [
      ...prevState,
      {
        ...shoe,
        cantidad_compra: 1,
      },
    ]);
  };

  const clearCart = () => {
    setCart([]);
  };

  const removeFromCart = (shoe) => {
    setCart((prevState) => prevState.filter((item) => item.id != shoe.id));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, clearCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
