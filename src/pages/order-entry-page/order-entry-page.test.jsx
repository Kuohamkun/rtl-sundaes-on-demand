import { render, screen } from "lib/testing-utils";
import userEvent from "@testing-library/user-event";
import OrderEntryPage from "./order-entry-page";
import { formatCurrency } from "lib/utils";
import { SCOOP_PRICE, TOPPING_PRICE } from "lib/constants";

test("check grand total by adding/removing scoops/toppings", async () => {
  const user = userEvent.setup();
  render(<OrderEntryPage />);

  // Check initial state
  const grandTotal = screen.getByRole("heading", { name: /^grand total/i });
  expect(grandTotal).toHaveTextContent(formatCurrency(0));

  // Add scoops then toppings and verify the grand total
  const plusIcons = await screen.findAllByTitle("plus");
  const checkboxes = await screen.findAllByRole("checkbox");

  for (const { parentElement: plusButton } of plusIcons) {
    await user.click(plusButton);
  }
  for (const checkbox of checkboxes) {
    await user.click(checkbox);
  }

  expect(grandTotal).toHaveTextContent(
    formatCurrency(
      SCOOP_PRICE * plusIcons.length + TOPPING_PRICE * checkboxes.length
    )
  );

  // Remove scoops then toppings and verify the grand total
  const minusIcons = await screen.findAllByTitle("minus");

  for (const { parentElement: minusButton } of minusIcons) {
    await user.click(minusButton);
  }
  for (const checkbox of checkboxes) {
    await user.click(checkbox);
  }

  expect(grandTotal).toHaveTextContent(formatCurrency(0));
});

test("check if order button is disabled when nothing is selected", async () => {
  const user = userEvent.setup();
  render(<OrderEntryPage />);

  const orderButton = screen.getByRole("button", {
    name: /order your sundae/i,
  });
  expect(orderButton).toBeDisabled();

  const plusIcons = await screen.findAllByTitle("plus");
  await user.click(plusIcons[0]);
  expect(orderButton).toBeEnabled();
});
