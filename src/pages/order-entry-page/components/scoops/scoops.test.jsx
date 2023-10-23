import { render, screen } from "@testing-library/react";
import Scoops from "./scoops";
import { scoops } from "mocks/data";
import { server } from "mocks/server";
import { rest } from "msw";
import { API_URL } from "lib/constants";

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
