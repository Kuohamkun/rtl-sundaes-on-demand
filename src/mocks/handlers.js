// src/mocks/handlers.js
import { rest } from "msw";
import { scoops, toppings, orderNumberResp } from "./data";

export const handlers = [
  rest.get("http://localhost:3030/scoops", (request, response, context) =>
    response(context.json(scoops))
  ),
  rest.get("http://localhost:3030/toppings", (request, response, context) =>
    response(context.json(toppings))
  ),
  rest.post("http://localhost:3030/order", (request, response, context) =>
    response(context.json(orderNumberResp))
  ),
];
