import { useContext } from "react";
import { OrderDetailsContext } from "./provider";

export const useOrderDetails = () => {
  const context = useContext(OrderDetailsContext);

  if (!context) {
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvider"
    );
  }

  return context;
};
