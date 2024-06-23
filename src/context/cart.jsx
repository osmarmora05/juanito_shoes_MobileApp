import { createContext, useState } from "react";

/*
  Contexto que se encarga de manejar los zapatos en el carrito. Permitira mostrar 
  en varias pantallas los zapatos a comprar
*/

export const CartContext = createContext();

export function CartProvider({ children }) {

  // Almacena los zapatos, agregado en el carrito
  const [cart, setCart] = useState([]);

  /*
   `addToCart`: Permite agregar zapatos al estado `cart`
    1. Buscamos en el estado `cart` si existe el zapato que se va agregar
    2. Si el zapato se encuntra en el estado `cart` aumentamos la cantidad de compra, con el valor
       que se le esta pasando por parametro(por cierto es un objeto)
    3. Si no hay un valor, entoces agregarmos el zapato que se le esta pasando por parametro al final
       del estado
  */
  const addToCart = (shoe) => {
    // Primero verificamos de que el zapato ya esté en el carrito
    const shoeInCartIndex = cart.findIndex(
      (item) =>
        item.id_modelo === shoe.id_modelo &&
        item.talla === shoe.talla &&
        item.color === shoe.color
    );

    if (shoeInCartIndex >= 0) {
      const newCart = structuredClone(cart);
      // Sustiuimos valor, pero idealmente si tiene que ir sumando
      // newCart[shoeInCartIndex].cantidad_compra += shoe.cantidad_compra;
      newCart[shoeInCartIndex].cantidad_compra = shoe.cantidad_compra;
      return setCart(newCart);
    }

    // El zapato no está en el carrito
    setCart((prevState) => [
      ...prevState,
      {
        ...shoe,
      },
    ]);
  };

  /*
    `clearCart`: Permite eliminar todos los zapatos del estado `cart`
  */

  const clearCart = () => {
    setCart([]);
  };

  /*
    `removeFromCart`: Permite eliminar un zapato en concreto del estado `cart`
    1. Filtramos el zapato pasado por parametro con el valor que contiene el estado `cart`
    2. Si el zapato filtrado es igual item, entonces es false y no se guarda en el nuevo arreglo
       creado por el filter
  */

  const removeFromCart = (shoe) => {
    setCart((prevState) =>
      prevState.filter((item) => item.id_modelo != shoe.id_modelo)
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, clearCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}