import { createContext, useContext, useState } from 'react';

export const PaymentContext = createContext();
PaymentContext.displayName = "Payment";

export const PaymentProvider = ({ children }) => {

  const paymentTypes = [
    {
      id: "1",
      name: "Boleto",
      fees: 1
    },
    {
      id: "2",
      name: "Crédito",
      fees: 1.3
    },
    {
      id: "3",
      name: "PIX",
      fees: 1
    },
    {
      id: "4",
      name: "Crediário",
      fees: 1.5
    }
  ];

  const [paymentType, setPaymentType] = useState(paymentTypes[0]);

  return (
    <PaymentContext.Provider value={{
      paymentTypes,
      paymentType,
      setPaymentType
    }}>
      {children}
    </PaymentContext.Provider>
  )
}

export const usePaymentContext = () => {
  const { paymentTypes, paymentType, setPaymentType } = useContext(PaymentContext);

  function changePaymentType(id) {
    const payment = paymentTypes.find(payment => payment.id === id);

    setPaymentType(payment);
  }

  return {
    paymentTypes,
    paymentType,
    changePaymentType
  }
}