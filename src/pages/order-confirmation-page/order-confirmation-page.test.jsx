import { render, screen } from "lib/testing-utils";
import OrderConfirmationPage from "./order-confirmation-page";
import { server } from "mocks/server";
import { rest } from "msw";
import { API_URL } from "lib/constants";

test("should show error alert if there is a server error", async () => {
  render(<OrderConfirmationPage />);

  server.resetHandlers(
    rest.post(`${API_URL}/order`, (req, resp, cxt) => resp(cxt.status(500)))
  );

  const errorAlert = await screen.findByRole("alert");
  expect(errorAlert).toBeInTheDocument();
});
