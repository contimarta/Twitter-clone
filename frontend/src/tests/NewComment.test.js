import { render, fireEvent, screen, waitFor,act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewComment from "../components/Main/PeepList/PeepItem/NewComment.jsx";
import { newComment } from "../utils/DataServices";

jest.mock("../utils/DataServices");

describe("NewComment component", () => {
  const uploadPeeps = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders NewComment component", () => {
    render(<NewComment peepId="1" uploadPeeps={uploadPeeps} />);
    expect(screen.getByText("Comment")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("handles user input and submits the form", async () => {
    render(<NewComment peepId="1" uploadPeeps={uploadPeeps} />);
    const commentInput = screen.getByRole("textbox");
    const submitButton = screen.getByText("Comment");
    act(() => {
      userEvent.type(commentInput, "Test comment");
    });
    act(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => expect(newComment).toHaveBeenCalledTimes(1));
    expect(newComment).toHaveBeenCalledWith("Test comment", "1");
  });
});
