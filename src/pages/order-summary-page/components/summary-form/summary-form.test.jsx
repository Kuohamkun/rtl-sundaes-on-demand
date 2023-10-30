import { render, screen, fireEvent } from "lib/testing-utils";
import SummaryForm from "./summary-form";
import userEvent from "@testing-library/user-event";

test("should enable order button when terms checked", () => {
  render(<SummaryForm />);

  // Check initial conditions
  const termsCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const orderButton = screen.getByRole("button", { name: /confirm order/i });

  expect(termsCheckbox).not.toBeChecked();
  expect(orderButton).toBeDisabled();

  // check terms and verify if button is enabled
  fireEvent.click(termsCheckbox);
  expect(orderButton).toBeEnabled();

  // Uncheck terms and verify button is disabled
  fireEvent.click(termsCheckbox);
  expect(orderButton).toBeDisabled();
});

test("should show terms popup on hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  const termsButton = screen.getByRole("button", {
    name: /\bterms and conditions\b/i,
  });

  // test initial state
  expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

  // hover
  await user.hover(termsButton);
  const termsPopup = screen.getByRole("tooltip");
  expect(termsPopup).toBeInTheDocument();

  // un-hover
  await user.unhover(termsButton);

  // Timeout omission may cause test failure. The element is still in the DOM after unhover.
  setTimeout(() => {
    expect(termsPopup).not.toBeInTheDocument();
  }, 10);
});
