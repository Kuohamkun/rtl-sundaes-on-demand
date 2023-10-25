import React from "react";

import OrderSummaryPage from "pages/order-summary-page/order-summary-page";
import OrderEntryPage from "pages/order-entry-page/order-entry-page";
import OrderDetailsProvider from "contexts/order-details/provider";
import OrderConfirmation from "pages/order-confirmation-page/order-confirmation-page";

function App() {
  return (
    <main>
      <OrderDetailsProvider>
        {/* <OrderSummaryPage /> */}
        {/* <OrderEntryPage /> */}
        <OrderConfirmation />
      </OrderDetailsProvider>
    </main>
  );
}

export default App;
