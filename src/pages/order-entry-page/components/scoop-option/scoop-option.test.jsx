import { render, screen } from "lib/testing-utils";
import userEvent from "@testing-library/user-event";
import ScoopOption from "./scoop-option";
import { scoops } from "mocks/data";

test("increment and decrement scoop count", async () => {
  const user = userEvent.setup();
  render(<ScoopOption scoop={scoops[0]} />);

  const plusButton = screen.getByTitle("plus").parentElement;
  const minusButton = screen.getByTitle("minus").parentElement;
  const scoopsCount = screen.getByTestId("scoops-count");

  // verify initial state: count is 0, plus enabled, minus disabled
  expect(plusButton).toBeEnabled();
  expect(minusButton).toBeDisabled();
  expect(scoopsCount).toHaveTextContent(0);

  // verify count after multiple increment
  for (let index = 1; index <= 10; index++) {
    await user.click(plusButton);
    expect(scoopsCount).toHaveTextContent(index);
  }

  // verify count after multiple decrement
  const currentCount = +scoopsCount.textContent;
  for (let index = currentCount - 1; index >= 0; index--) {
    await user.click(minusButton);
    expect(scoopsCount).toHaveTextContent(index);
  }

  // Verify initial state
  expect(plusButton).toBeEnabled();
  expect(minusButton).toBeDisabled();
  expect(scoopsCount).toHaveTextContent(0);
});
