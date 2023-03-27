import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import { peepList } from "../utils/DataServices.js";

jest.mock("../utils/DataServices.js");


describe("App tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

test("renders Header component", () => {
  render(<App />);
  expect(screen.getByText(/My Chitter App/i)).toBeInTheDocument();
});

test("renders log in button", () => {
  render(<App />);
  expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
});

test("renders sign up button", () => {
  render(<App />);
  expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
});

test("renders Main component when peeps are available", async () => {
  peepList.mockResolvedValue([
    {
      _id: "1",
      content: "Test Peep",
      comments: [],
      user: { name: "Julia", username: "Julieta" },
      createdAt: "2023-03-25T00:00:00.000Z",
    },
  ]);
  render(<App />);
  await waitFor(async() =>
    expect(await screen.getByText(/Test Peep/i)).toBeInTheDocument()
  );
});

test("renders 'You need to log in to peep and add comments!' when not logged in", async () => {
  render(<App />);
  expect(
    screen.getByText(/You need to log in to peep and add comments!/i)
  ).toBeInTheDocument();
});

test("renders No peeps to display message when peepList returns error", async () => {
  peepList.mockResolvedValue({ error: "An error occurred" });
  render(<App />);
  await waitFor(async () =>
    expect(await screen.getByText(/No peeps to display!/i)).toBeInTheDocument()
  );
});

test("renders peep with correct peep content", async () => {
  peepList.mockResolvedValue([
    {
      _id: "1",
      content: "Test Peep",
      comments: [],
      user: { name: "Julia", username: "Julieta" },
      createdAt: "2023-03-25T00:00:00.000Z",
    },
  ]);
  render(<App />);
  await waitFor(async () =>
    expect(await screen.getByText(/Test Peep/i)).toBeInTheDocument()
  );
});

test("renders peep with correct username", async () => {
  peepList.mockResolvedValue([
    {
      _id: "1",
      content: "Test Peep",
      comments: [],
      user: { name: "Julia", username: "Julieta" },
      createdAt: "2023-03-25T00:00:00.000Z",
    },
  ]);
  render(<App />);
  await waitFor(async () =>
    expect(await screen.getByText(/@Julieta/i)).toBeInTheDocument()
  );
});



test("renders yesterday peep with correct date", async () => {
  peepList.mockResolvedValue([
    {
      _id: "1",
      content: "Test Peep",
      comments: [],
      user: { name: "Julia", username: "Julieta" },
      createdAt: "2023-03-24T00:00:00.000Z",
    },
  ]);
  render(<App />);
  await waitFor(async () =>
    expect(await screen.getByText("24/03/23 at 00:00")).toBeInTheDocument()
  );
});


test("renders 'Peeps are loading...' while peeps are still loading", async () => {
  render(<App />);
  expect(await screen.getByText(/Peeps are loading.../i)).toBeInTheDocument();
});
})


