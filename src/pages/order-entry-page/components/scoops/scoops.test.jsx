import { render, screen } from "lib/testing-utils";
import userEvent from "@testing-library/user-event";
import Scoops from "./scoops";
import { scoops } from "mocks/data";
import { server } from "mocks/server";
import { rest } from "msw";
import { API_URL, SCOOP_PRICE } from "lib/constants";

test("check if scoops are fetched correctly", async () => {
  render(<Scoops />);

  const scoopsImages = await screen.findAllByAltText(/scoop$/i);
  expect(scoopsImages).toHaveLength(scoops.length);
});

test("handles error case", async () => {
  render(<Scoops />);

  server.resetHandlers(
    rest.get(`${API_URL}/scoops`, (request, response, context) =>
      response(context.status(500))
    )
  );

  const errorAlert = await screen.findByRole("alert");
  expect(errorAlert).toBeInTheDocument();
});

test("scoops total price is updated with correct amount", async () => {
  const user = userEvent.setup();
  render(<Scoops />);

  const scoopsTotal = screen.getByTestId("scoops-total");

  // add scoops and verify total
  const plusIcons = await screen.findAllByTitle("plus");

  for (const [index, plusIcon] of plusIcons.entries()) {
    await user.click(plusIcon.parentElement);
    expect(scoopsTotal).toHaveTextContent(SCOOP_PRICE * (index + 1));
  }

  // remove scoops and verify total
  const total = +scoopsTotal.textContent.substring(1);
  const minusIcons = await screen.findAllByTitle("minus");

  for (const [index, minusIcon] of minusIcons.entries()) {
    await user.click(minusIcon.parentElement);
    expect(scoopsTotal).toHaveTextContent(total - SCOOP_PRICE * (index + 1));
  }
});
