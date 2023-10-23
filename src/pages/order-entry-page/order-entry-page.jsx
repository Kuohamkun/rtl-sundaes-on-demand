import React from "react";
import Scoops from "./components/scoops/scoops";

export default function OrderEntryPage() {
  return (
    <div className="container px-20 py-10">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10">
        Design Your Sundae
      </h1>
      <Scoops />
    </div>
  );
}
