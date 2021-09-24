import { createContext, useContext, useEffect, useState } from 'react';
import { usePaymentContext } from './Payment';
import { UserContext } from './User';

export const CartContext = createContext();
CartContext.displayName = "Cart";

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);
  const [productsAmount, setProductsAmount] = useState(0);
  const [cartTotalValue, setCartTotalValue] = useState(0)

  return (
    <CartContext.Provider
      value={{ cart, setCart, productsAmount, setProductsAmount, cartTotalValue, setCartTotalValue }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  const { cart, setCart, productsAmount, setProductsAmount, cartTotalValue, setCartTotalValue } = useContext(CartContext);
  const { paymentType } = usePaymentContext();
  const { setBalance } = useContext(UserContext);

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

  function purchase() {
    setCart([]);
    setBalance(actualBalance => actualBalance - cartTotalValue);
  }

  useEffect(() => {
    const { newAmountOfProductsInCart, newTotal } = cart.reduce((counter, product) => {
      return ({
        newAmountOfProductsInCart: counter.newAmountOfProductsInCart + product.amount,
        newTotal: counter.newTotal + (product.valor * product.amount)
      });
    }, {
      newAmountOfProductsInCart: 0,
      newTotal: 0
    });

    setProductsAmount(newAmountOfProductsInCart);
    setCartTotalValue(newTotal * paymentType.fees);

  }, [cart, setProductsAmount, setCartTotalValue, paymentType]);

  return {
    cart,
    addProduct,
    removeProduct,
    productsAmount,
    cartTotalValue,
    purchase
  }
}