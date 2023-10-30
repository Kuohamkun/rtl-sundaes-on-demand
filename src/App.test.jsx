import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "App";
import { SCOOP_PRICE, TOPPING_PRICE } from "lib/constants";
import { orderNumberResp } from "mocks/data";

test("check order phases (happy path)", async () => {
  const user = userEvent.setup();
  render(<App />);

  // Entry Phase : Make an order and go to next phase
  const plusIcons = await screen.findAllByTitle("plus");
  await user.click(plusIcons[0].parentElement);
  const checkboxes = await screen.findAllByRole("checkbox");
  await user.click(checkboxes[0]);
  const orderButton = screen.getByRole("button", {
    name: /order your sundae/i,
  });
  await user.click(orderButton);

  // Summary Phase: Check order summary and go to next phase
  const scoopsTotalMatch = screen
    .getByText(/^scoops/i)
    .textContent.match(/\d+\.\d+$/i);
  const scoopsTotal = scoopsTotalMatch.length ? +scoopsTotalMatch[0] : null;
  expect(scoopsTotal).toBe(SCOOP_PRICE);

  const toppingsTotalMatch = screen
    .getByText(/^toppings/i)
    .textContent.match(/\d+\.\d+$/i);
  const toppingsTotal = toppingsTotalMatch.length
    ? +toppingsTotalMatch[0]
    : null;
  expect(toppingsTotal).toBe(TOPPING_PRICE);

  expect(toppingsTotal + scoopsTotal).toBe(TOPPING_PRICE + SCOOP_PRICE);

  const termsCheckbox = screen.getByRole("checkbox");
  await user.click(termsCheckbox);
  const orderConfirmationButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  await user.click(orderConfirmationButton);

  // Confirmation Phase : Verify generated order number and go back to entry phase
  const orderNumberHeading = await screen.findByRole("heading", {
    name: /^your order number is/i,
  });
  const orderNumberMatch = orderNumberHeading.textContent.match(/\d+$/i);
  const orderNumber = orderNumberMatch.length ? orderNumberMatch[0] : null;
  expect(orderNumber).toBe(orderNumberResp.orderNumber.toString());

  const orderAgainButton = screen.getByRole("button", {
    name: /create new order/i,
  });
  await user.click(orderAgainButton);

  // Entry Phase : Check if order details are reset
  const scoopsPriceMatch = screen
    .getByTestId("scoops-total")
    .textContent.match(/\d+\.\d+$/i);
  const scoopsPrice = scoopsPriceMatch.length ? +scoopsPriceMatch[0] : null;
  expect(scoopsPrice).toBe(0);

  const toppingsPriceMatch = screen
    .getByTestId("toppings-total")
    .textContent.match(/\d+\.\d+$/i);
  const toppingsPrice = toppingsPriceMatch.length
    ? +toppingsPriceMatch[0]
    : null;
  expect(toppingsPrice).toBe(0);

  const grandTotalHeading = screen.getByRole("heading", {
    name: /^grand total/i,
  });
  const grandTotalMatch = grandTotalHeading.textContent.match(/\d+\.\d+$/i);
  const grandTotal = grandTotalMatch.length ? +grandTotalMatch[0] : null;
  expect(grandTotal).toBe(0);
});
