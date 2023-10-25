import React from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "components/ui/button";

const uid = () => String(Date.now().toString(32));

export default function OrderConfirmation() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10">
        Thank you!
      </h1>

      <h2 className="text-xl font-semibold">
        Your order number is{" "}
        <span className="text-muted-foreground">{uid()}</span>
      </h2>

      <p>As per our terms and conditions, nothing will happen now</p>

      <Button size="lg" className="my-4 w-fit">
        <RotateCcw className="mr-2 h-7 w-7" /> Create New Order
      </Button>
    </div>
  );
}
