import React, { useState } from "react";
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

export default function ScoopOption({ scoop, onCountChange }) {
  const [count, setCount] = useState(0);

  return (
    <Card className="text-center w-full">
      <CardHeader>
        <Badge variant="secondary" className="w-fit" size="sm">
          {SCOOP_PRICE}$
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
            onClick={() => {
              setCount((prevCount) => prevCount + 1);
              onCountChange(SCOOP_PRICE);
            }}
          >
            <Plus title={"plus"} className="h-4 w-4" />
          </Button>
          <span data-testid="scoops-count" className="font-semibold mx-4">
            {count}
          </span>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => {
              setCount((prevCount) => prevCount - 1);
              onCountChange(-SCOOP_PRICE);
            }}
            disabled={count === 0}
          >
            <Minus title={"minus"} className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
