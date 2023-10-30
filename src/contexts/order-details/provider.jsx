import { createContext, useState, useMemo, useCallback } from "react";
import { OrderPhase, SCOOP_PRICE, TOPPING_PRICE } from "lib/constants";

const initialState = {
  orderPhase: OrderPhase.ENTRY,
  order: {
    scoops: null,
    toppings: null,
  },
};

export const OrderDetailsContext = createContext();

export default function OrderDetailsProvider({ children }) {
  const [order, setOrder] = useState(initialState.order);
  const [orderPhase, setOrderPhase] = useState(initialState.orderPhase);

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
    setOrderPhase(OrderPhase.ENTRY);
  };

  const value = useMemo(
    () => ({
      order,
      orderPhase,
      setOrderPhase,
      resetOrder,
      updateScoopOrder,
      updateToppingOrder,
      getPrice,
    }),
    [getPrice, order, orderPhase]
  );

  return (
    <OrderDetailsContext.Provider value={value}>
      {children}
    </OrderDetailsContext.Provider>
  );
}
