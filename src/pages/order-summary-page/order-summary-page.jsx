import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import SummaryForm from "./components/summary-form/summary-form";
import { useOrderDetails } from "contexts/order-details/use-order-details";
import { formatCurrency } from "lib/utils";

export default function OrderSummaryPage() {
  const { getPrice, order } = useOrderDetails();
  const { scoops: scoopsPrice, toppings: toppingsPrice, total } = getPrice();

  const renderScoopsItems = () => {
    const { scoops } = order;

    return scoops
      ? Object.entries(scoops).map(
          ([name, count], index) =>
            !!count && <li key={index}>{`x${count} ${name}`}</li>
        )
      : null;
  };

  const renderToppingsItems = () => {
    const { toppings } = order;

    return toppings
      ? Object.entries(toppings).map(
          ([name, count], index) =>
            !!count && <li key={index}>{`x${count} ${name}`}</li>
        )
      : null;
  };

  return (
    <div className={"h-screen flex flex justify-center items-center"}>
      <Card className="w-3/5 h-min my-10">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
          <CardDescription>
            Delight in Every Bite: Your Handcrafted Sundae, Your Way! 🍦
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Scoops{" "}
              <span className="text-cyan-500">
                {formatCurrency(scoopsPrice)}
              </span>
            </h4>
            <ul className="my-4 ml-11 list-disc [&>li]:mt-2">
              {renderScoopsItems()}
            </ul>
          </div>

          {!!toppingsPrice && (
            <div className="my-10">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Toppings{" "}
                <span className="text-cyan-500">
                  {formatCurrency(toppingsPrice)}
                </span>
              </h4>
              <ul className="my-4 ml-11 list-disc [&>li]:mt-2">
                {renderToppingsItems()}
              </ul>
            </div>
          )}

          <h4 className="scroll-m-20 text-2xl font-bold tracking-tight">
            Total <span className="text-cyan-500">{formatCurrency(total)}</span>
          </h4>
        </CardContent>
        <CardFooter>
          <SummaryForm />
        </CardFooter>
      </Card>
    </div>
  );
}
