import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import styles from "./order-summary-page.module.css";
import SummaryForm from "./components/summary-form/summary-form";

export default function OrderSummaryPage() {
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
          <p>Scoops</p>
        </CardContent>
        <CardFooter>
          <SummaryForm />
        </CardFooter>
      </Card>
    </div>
  );
}
