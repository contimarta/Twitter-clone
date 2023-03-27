import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewPeep from "../components/Main/NewPeep/NewPeep.jsx";
import { newPeep } from "../utils/DataServices";

jest.mock("../utils/DataServices");

const uploadPeeps = jest.fn();

describe("NewPeep component", () => {
  test("renders correctly", async () => {
    render(<NewPeep uploadPeeps={uploadPeeps} />);
    expect(
      await screen.getByPlaceholderText("What's happening?")
    ).toBeInTheDocument();
    expect(await screen.getByText("PEEP")).toBeInTheDocument();
  });

  test("handles user input", () => {
    render(<NewPeep uploadPeeps={uploadPeeps} />);
    const input = screen.getByPlaceholderText("What's happening?");

    act(() => {
      userEvent.type(input, "A new peep");
    });
    expect(input.value).toBe("A new peep");
  });

  test("handles form submission", async () => {
    render(<NewPeep uploadPeeps={uploadPeeps} />);
    const input = screen.getByPlaceholderText("What's happening?");
    const submitButton = screen.getByText("PEEP");

    act(() => {
      userEvent.type(input, "A new peep");
    });
    act(() => {
      fireEvent.click(submitButton);
    });
    await waitFor(async () => await expect(newPeep).toHaveBeenCalledTimes(1));
    await expect(newPeep).toHaveBeenCalledWith("A new peep");
    await expect(uploadPeeps).toHaveBeenCalledTimes(1);
  });
});
