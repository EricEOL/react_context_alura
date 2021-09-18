import { createContext, useContext, useState } from 'react';

export const CartContext = createContext();
CartContext.displayName = "Cart";

export const CartProvider = ({children}) => {
  
  const [cart, setCart] = useState([]);
  
  return (
    <CartContext.Provider value={{ cart, setCart}}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  const {cart, setCart} = useContext(CartContext);

  function addProduct(product) {
    const productAlreadyExists = cart.some(cartItem => cartItem.id === product.id);

    if (!productAlreadyExists) {

      product.amount = 1;

      return setCart(oldCart =>
        [...oldCart, product]
      );
    }

    setCart(oldCart => oldCart.map(cartItem => {
      if (cartItem.id === product.id) cartItem.amount += 1;

      return cartItem;
    }))

  }

  function removeProduct(product) {

  }
  
  return {
    cart,
    addProduct
  }
}