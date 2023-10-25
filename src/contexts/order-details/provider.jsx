import { createContext, useState, useMemo, useCallback } from "react";
import { SCOOP_PRICE, TOPPING_PRICE } from "lib/constants";

const initialState = {
  order: {
    scoops: null,
    toppings: null,
  },
  price: {
    scoops: 0,
    toppings: 0,
    total: 0,
  },
};

export const OrderDetailsContext = createContext();

export default function OrderDetailsProvider({ children }) {
  const [order, setOrder] = useState(initialState.order);
  const [price, setPrice] = useState(initialState.price);

  const updateScoopOrder = (itemName, itemCount) =>
    setOrder(({ toppings, scoops: prevScoops }) => ({
      toppings,
      scoops: { ...prevScoops, [itemName]: itemCount },
    }));

  const updateToppingOrder = (itemName, itemCount) =>
    setOrder(({ toppings: prevToppings, scoops }) => ({
      scoops,
      toppings: { ...prevToppings, [itemName]: itemCount },
    }));

  const getPrice = useCallback(() => {
    const scoopsCount = order.scoops
      ? Object.values(order.scoops).reduce((total, value) => total + value, 0)
      : 0;
    const toppingsCount = order.toppings
      ? Object.values(order.toppings).reduce((total, value) => total + value, 0)
      : 0;
    const scoopsTotal = scoopsCount * SCOOP_PRICE;
    const toppingsTotal = toppingsCount * TOPPING_PRICE;

    return {
      scoops: scoopsTotal,
      toppings: toppingsTotal,
      total: scoopsTotal + toppingsTotal,
    };
  }, [order.scoops, order.toppings]);

  const resetOrder = () => {
    setOrder(initialState.order);
    setPrice(initialState.price);
  };

  const value = useMemo(
    () => ({
      order,
      price,
      resetOrder,
      updateScoopOrder,
      updateToppingOrder,
      getPrice,
    }),
    [getPrice, order, price]
  );

  return (
    <OrderDetailsContext.Provider value={value}>
      {children}
    </OrderDetailsContext.Provider>
  );
}
