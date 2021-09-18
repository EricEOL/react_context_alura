import { createContext, useContext, useState } from 'react';

export const CartContext = createContext();
CartContext.displayName = "Cart";

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  const { cart, setCart } = useContext(CartContext);

  function changeAmount(id, amount) {
    return cart.map(cartItem => {
      if (cartItem.id === id) {
        if(cartItem.amount === 0 && amount === -1) return cartItem;
        cartItem.amount += amount;
        return cartItem;
      }
      return cartItem;
    })
  }

  function addProduct(product) {
    const productAlreadyExists = cart.some(cartItem => cartItem.id === product.id);

    if (!productAlreadyExists) {

      product.amount = 1;

      return setCart(oldCart =>
        [...oldCart, product]
      );
    }

    setCart(changeAmount(product.id, 1))
  }

  function removeProduct(id) {
    const product = cart.find(cartItem => cartItem.id === id);

    if (product?.amount === undefined) return;

    if (product.amount === 1) setCart(oldCart => oldCart.filter(cartItem => cartItem.id !== product.id));

    setCart(changeAmount(product.id, -1));
  }

  return {
    cart,
    addProduct,
    removeProduct
  }
}