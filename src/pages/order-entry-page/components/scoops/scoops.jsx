import React, { useEffect, useState } from "react";
import { Badge } from "components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "components/ui/alert";
import { AlertCircle } from "lucide-react";
import { API_URL } from "lib/constants";
import ScoopOption from "../scoop-option/scoop-option";

export default function Scoops() {
  const [scoops, setScoops] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/scoops`)
      .then((response) => response.json())
      .then((scoopsData) => setScoops(scoopsData))
      .catch(setError);
  }, []);

  const handleTotalPrice = (amount) => {
    setTotalPrice((prevTotal) => prevTotal + amount);
  };

  return (
    <section>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Scoops
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
            Scoops total: <Badge className="text-xl">{totalPrice}$</Badge>
          </div>

          <div className="flex justify-between gap-4">
            {scoops?.map((scoop, index) => (
              <ScoopOption
                key={index}
                scoop={scoop}
                onCountChange={handleTotalPrice}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
