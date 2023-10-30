import React from "react";
import Scoops from "./components/scoops/scoops";
import Toppings from "./components/toppings/toppings";
import { formatCurrency } from "lib/utils";
import { useOrderDetails } from "contexts/order-details/use-order-details";
import { ChevronRight } from "lucide-react";
import { Button } from "components/ui/button";
import { OrderPhase } from "lib/constants";

export default function OrderEntryPage() {
  const { getPrice, setOrderPhase } = useOrderDetails();
  const { total: grandTotal, scoops: scoopsTotal } = getPrice();

  return (
    <div className="container px-20 py-10">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10">
        Design Your Sundae
      </h1>
      <Scoops />
      <Toppings />
      <h3 className="flex align-middle text-4xl font-bold tracking-tight mt-10">
        <span>Grand Total:</span>
        <span className="text-cyan-500 ml-4">{formatCurrency(grandTotal)}</span>
      </h3>
      <Button
        size="lg"
        className="my-4"
        disabled={scoopsTotal === 0}
        onClick={() => setOrderPhase(OrderPhase.SUMMARY)}
      >
        <ChevronRight className="mr-2 h-7 w-7" /> Order Your Sundae
      </Button>
    </div>
  );
}
