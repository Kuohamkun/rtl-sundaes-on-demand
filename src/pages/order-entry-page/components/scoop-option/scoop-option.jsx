import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import { Badge } from "components/ui/badge";
import { Button } from "components/ui/button";
import { Plus, Minus } from "lucide-react";
import { API_URL, SCOOP_PRICE } from "lib/constants";
import { useOrderDetails } from "contexts/order-details/use-order-details";
import { formatCurrency } from "lib/utils";

export default function ScoopOption({ scoop }) {
  const [count, setCount] = useState(0);
  const { updateScoopOrder } = useOrderDetails();

  useEffect(() => {
    updateScoopOrder(scoop.name, count);
  }, [count]);

  return (
    <Card className="text-center w-full">
      <CardHeader>
        <Badge variant="secondary" className="w-fit" size="sm">
          {formatCurrency(SCOOP_PRICE)}
        </Badge>
        <CardTitle>{scoop.name}</CardTitle>
      </CardHeader>

      <CardContent className="flex justify-center">
        <img
          width={130}
          src={`${API_URL}/${scoop.imagePath}`}
          alt={`${scoop.name} scoop`}
        />
      </CardContent>

      <CardFooter className="flex justify-center">
        <div className="flex">
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => setCount((prevCount) => prevCount + 1)}
          >
            <Plus title={"plus"} className="h-4 w-4" />
          </Button>
          <span data-testid="scoops-count" className="font-semibold mx-4">
            {count}
          </span>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => setCount((prevCount) => prevCount - 1)}
            disabled={count === 0}
          >
            <Minus title={"minus"} className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
