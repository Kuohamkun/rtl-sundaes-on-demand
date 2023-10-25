import React, { useState, useEffect } from "react";
import { TOPPING_PRICE, API_URL } from "lib/constants";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import { Badge } from "components/ui/badge";
import { Checkbox } from "components/ui/checkbox";
import { formatCurrency } from "lib/utils";
import { useOrderDetails } from "contexts/order-details/use-order-details";

export default function ToppingOption({ topping }) {
  const { updateToppingOrder } = useOrderDetails();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    updateToppingOrder(topping.name, +isChecked);
  }, [isChecked]);

  return (
    <Card className="text-center w-full">
      <CardHeader>
        <Badge variant="secondary" className="w-fit" size="sm">
          {formatCurrency(TOPPING_PRICE)}
        </Badge>
        <CardTitle>{topping.name}</CardTitle>
      </CardHeader>

      <CardContent className="flex justify-center">
        <img
          width={130}
          src={`${API_URL}/${topping.imagePath}`}
          alt={`${topping.name} topping`}
        />
      </CardContent>

      <CardFooter className="flex justify-center">
        <Checkbox checked={isChecked} onCheckedChange={setIsChecked} />
      </CardFooter>
    </Card>
  );
}
