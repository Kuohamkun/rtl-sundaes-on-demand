import React from "react";
import { useOrderDetails } from "contexts/order-details/use-order-details";
import { OrderPhase } from "lib/constants";
import OrderSummaryPage from "pages/order-summary-page/order-summary-page";
import OrderEntryPage from "pages/order-entry-page/order-entry-page";
import OrderConfirmation from "pages/order-confirmation-page/order-confirmation-page";

export default function Router() {
  const { orderPhase } = useOrderDetails();

  const CurrentOrderPage =
    orderPhase === OrderPhase.SUMMARY
      ? OrderSummaryPage
      : orderPhase === OrderPhase.CONFIRMATION
      ? OrderConfirmation
      : OrderEntryPage;

  return <CurrentOrderPage />;
}
