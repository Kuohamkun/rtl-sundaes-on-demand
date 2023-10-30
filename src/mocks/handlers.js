// src/mocks/handlers.js
import { rest } from "msw";
import { scoops, toppings, orderNumberResp } from "./data";
import { sleep } from "lib/utils";

export const handlers = [
  rest.get(
    "http://localhost:3030/scoops",
    async (request, response, context) => {
      await sleep(800);
      return response(context.json(scoops));
    }
  ),
  rest.get(
    "http://localhost:3030/toppings",
    async (request, response, context) => {
      await sleep(800);
      return response(context.json(toppings));
    }
  ),
  rest.post(
    "http://localhost:3030/order",
    async (request, response, context) => {
      await sleep(800);
      return response(context.json(orderNumberResp));
    }
  ),
];
