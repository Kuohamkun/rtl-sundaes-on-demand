import React, { useState } from "react";
import { Checkbox } from "components/ui/checkbox";
import { Label } from "components/ui/label";
import { Button } from "components/ui/button";
import { ChevronRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "components/ui/tooltip";
import { useOrderDetails } from "contexts/order-details/use-order-details";
import { OrderPhase } from "lib/constants";

export default function SummaryForm() {
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const { setOrderPhase } = useOrderDetails();

  return (
    <div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={isTermsChecked}
          onCheckedChange={setIsTermsChecked}
        />
        <Label htmlFor="terms">
          I agree to
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  className="p-1"
                  variant="link"
                  style={{ color: "#5272F2" }}
                >
                  Terms and Conditions
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="w-2/3"
                hideWhenDetached={true}
              >
                <p>
                  Terms and Conditions Disclaimer: <br />
                  No Real Ice Cream Deliveries Here – Just a Scoop of Humor!
                  🍦😄
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
      </div>
      <Button
        className="my-4"
        disabled={!isTermsChecked}
        onClick={() => setOrderPhase(OrderPhase.CONFIRMATION)}
      >
        <ChevronRight className="mr-2 h-4 w-4" /> Confirm order
      </Button>
    </div>
  );
}
