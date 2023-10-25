import React, { useEffect, useState } from "react";
import ToppingOption from "../topping-option/topping-option";
import { Badge } from "components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "components/ui/alert";
import { AlertCircle } from "lucide-react";
import { API_URL } from "lib/constants";
import { useOrderDetails } from "contexts/order-details/use-order-details";
import { formatCurrency } from "lib/utils";

export default function Toppings() {
  const [toppings, setToppings] = useState(null);
  const [error, setError] = useState(null);
  const { getPrice } = useOrderDetails();
  const { toppings: toppingsTotal } = getPrice();

  useEffect(() => {
    fetch(`${API_URL}/toppings`)
      .then((response) => response.json())
      .then((scoopsData) => setToppings(scoopsData))
      .catch(setError);
  }, []);

  return (
    <section className="mt-10">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Toppings
      </h2>
      {error ? (
        <Alert className="my-4" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Something went wrong. Please try again later.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <div className="scroll-m-20 text-xl font-semibold tracking-tight my-4">
            Toppings total:{" "}
            <Badge data-testid="toppings-total" className="text-xl">
              {formatCurrency(toppingsTotal)}
            </Badge>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {toppings?.map((topping, index) => (
              <ToppingOption key={index} topping={topping} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
