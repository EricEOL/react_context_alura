import { createContext, useContext, useEffect, useState } from 'react';

export const CartContext = createContext();
CartContext.displayName = "Cart";

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);
  const [productsAmount, setProductsAmount] = useState(0);

  return (
    <CartContext.Provider
      value={{ cart, setCart, productsAmount, setProductsAmount }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  const { cart, setCart, productsAmount, setProductsAmount } = useContext(CartContext);

  function changeAmount(id, amount) {
    return cart.map(cartItem => {
      if (cartItem.id === id) {
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

    if (product.amount === 1) return setCart(oldCart => oldCart.filter(cartItem => cartItem.id !== product.id));

    setCart(changeAmount(product.id, -1));
  }

  useEffect(() => {
    const newAmountOfProductsInCart = cart.reduce((counter, product) => {
      return counter + product.amount;
    }, 0);

    setProductsAmount(newAmountOfProductsInCart);
  }, [cart]);

  return {
    cart,
    addProduct,
    removeProduct,
    productsAmount
  }
}