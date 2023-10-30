import React from "react";
import OrderDetailsProvider from "contexts/order-details/provider";
import Router from "./router";

function App() {
  return (
    <main>
      <OrderDetailsProvider>
        <Router />
      </OrderDetailsProvider>
    </main>
  );
}

export default App;
