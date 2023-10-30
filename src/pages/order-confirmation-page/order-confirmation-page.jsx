import React, { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "components/ui/button";
import { API_URL } from "lib/constants";
import { Loader2 as Loader } from "lucide-react";
import { useOrderDetails } from "contexts/order-details/use-order-details";
import { Alert, AlertDescription, AlertTitle } from "components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function OrderConfirmation() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);
  const { resetOrder } = useOrderDetails();

  useEffect(() => {
    fetch(`${API_URL}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setOrderNumber(data.orderNumber))
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Loader className="mr-2 h-16 w-16 animate-spin" title="loader" />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {error ? (
        <Alert className="my-4 w-fit" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Something went wrong. Please try again later.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10">
            Thank you!
          </h1>
          <h2 className="text-xl font-semibold">
            Your order number is{" "}
            <span className="text-muted-foreground">{orderNumber}</span>
          </h2>
          <p>As per our terms and conditions, nothing will happen now</p>
        </>
      )}

      <Button size="lg" className="my-4 w-fit" onClick={resetOrder}>
        <RotateCcw className="mr-2 h-7 w-7" /> Create New Order
      </Button>
    </div>
  );
}
