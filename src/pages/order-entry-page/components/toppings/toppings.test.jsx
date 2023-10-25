import { render, screen } from "lib/testing-utils";
import { toppings } from "mocks/data";
import Toppings from "./toppings";
import userEvent from "@testing-library/user-event";
import { API_URL, TOPPING_PRICE } from "lib/constants";
import { server } from "mocks/server";
import { rest } from "msw";

test("check if toppings are fetched correctly", async () => {
  render(<Toppings />);

  const toppingsImages = await screen.findAllByAltText(/topping$/i);
  expect(toppingsImages).toHaveLength(toppings.length);
});

test("handles error case", async () => {
  render(<Toppings />);

  server.resetHandlers(
    rest.get(`${API_URL}/toppings`, (request, response, context) =>
      response(context.status(500))
    )
  );

  const errorAlert = await screen.findByRole("alert");
  expect(errorAlert).toBeInTheDocument();
});

test("check toppings total price after and before selection", async () => {
  const user = userEvent.setup();
  render(<Toppings />);

  const toppingsTotal = screen.getByTestId("toppings-total");

  // find all checkboxes
  const toppingCheckboxes = await screen.findAllByRole("checkbox");

  // check toppings and expect total price
  for (const [index, toppingCheckbox] of toppingCheckboxes.entries()) {
    await user.click(toppingCheckbox);
    expect(toppingsTotal).toHaveTextContent(TOPPING_PRICE * (index + 1));
  }

  // uncheck toppings and expect total price
  const totalPrice = toppingsTotal.textContent.substring(1);
  for (const [index, toppingCheckbox] of toppingCheckboxes.entries()) {
    await user.click(toppingCheckbox);
    expect(toppingsTotal).toHaveTextContent(
      totalPrice - TOPPING_PRICE * (index + 1)
    );
  }
});
