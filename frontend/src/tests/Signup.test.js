import React from "react";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Signup from "../components/Header/Signup/Signup.jsx";
import { signUp } from "../utils/AuthServices.js";

jest.mock("../utils/AuthServices.js");

describe("Signup component tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Signup form is not visible by default", () => {
    //arrange
    render(<Signup />);
    //assert
    expect(screen.queryByLabelText("Name:")).not.toBeInTheDocument();
  });

  test("Signup form is displayed when SIGN UP button is clicked", () => {
    //arrange
    render(<Signup />);
    //act
    act(() => {
      fireEvent.click(screen.getByText(/SIGN UP/i));
    });
    //assert
    expect(screen.getByLabelText("Name:")).toBeInTheDocument();
  });

  test("signup form is hidden when BACK button is clicked", () => {
    //arrange
    render(<Signup />);
    //act
    act(() => {
      fireEvent.click(screen.getByText(/SIGN UP/i));
    });
    act(() => {
      fireEvent.click(screen.getByText(/BACK/i));
    });
    //assert
    expect(screen.queryByLabelText("Name:")).not.toBeInTheDocument();
  });

  test("input fields are updated when the user types", () => {
    //arrange
    render(<Signup />);
    act(() => {
      fireEvent.click(screen.getByText(/SIGN UP/i));
    });
    //act
    act(() => {
      fireEvent.change(screen.getByLabelText(/Email:/i), {
        target: { value: "test@chitter.com" },
      });
    });
    act(() => {
      fireEvent.change(screen.getByLabelText(/Password:/i), {
        target: { value: "password123" },
      });
    });
    act(() => {
      fireEvent.change(screen.getByLabelText("Name:"), {
        target: { value: "July" },
      });
    });
    act(() => {
      fireEvent.change(screen.getByLabelText(/Username:/i), {
        target: { value: "July123" },
      });
    });
    //assert
    expect(screen.getByLabelText(/Email:/i)).toHaveValue("test@chitter.com");
    expect(screen.getByLabelText(/Password:/i)).toHaveValue("password123");
    expect(screen.getByLabelText("Name:")).toHaveValue("July");
    expect(screen.getByLabelText(/Username:/i)).toHaveValue("July123");
  });

  test("signUp function is called with correct input values when the form is submitted", async () => {
    //arrange
    signUp.mockResolvedValue({
      user: { name: "July" },
    });
    render(<Signup />);
    //act
    act(() => {
      fireEvent.click(screen.getByText(/SIGN UP/i));
    });
    act(() => {
      fireEvent.change(screen.getByLabelText(/Email:/i), {
        target: { value: "test@chitter.com" },
      });
    });
    act(() => {
      fireEvent.change(screen.getByLabelText(/Password:/i), {
        target: { value: "password123" },
      });
    });
    act(() => {
      fireEvent.change(screen.getByLabelText("Name:"), {
        target: { value: "July" },
      });
    });
    act(() => {
      fireEvent.change(screen.getByLabelText(/Username:/i), {
        target: { value: "July123" },
      });
    });
    act(() => {
      fireEvent.submit(screen.getByText("SIGN UP"));
    });
    //assert
    await waitFor(() => {
      expect(signUp).toHaveBeenCalledWith({
        email: "test@chitter.com",
        password: "password123",
        name: "July",
        username: "July123",
      });
    });
  });

  test("alert is displayed when signup is successful", async () => {
    //arrange
    signUp.mockResolvedValue({
      user: { name: "July" },
    });
    render(<Signup />);
    //act
    act(() => {
      fireEvent.click(screen.getByText(/SIGN UP/i));
    });
    act(() => {
      fireEvent.change(screen.getByLabelText(/Email:/i), {
        target: { value: "test@chitter.com" },
      });
    });
    act(() => {
      fireEvent.change(screen.getByLabelText(/Password:/i), {
        target: { value: "password123" },
      });
    });
    act(() => {
      fireEvent.change(screen.getByLabelText("Name:"), {
        target: { value: "July" },
      });
    });
    act(() => {
      fireEvent.change(screen.getByLabelText(/Username:/i), {
        target: { value: "July123" },
      });
    });
    act(() => {
      fireEvent.submit(screen.getByText("SIGN UP"));
    });
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    //assert
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "Sign up successful. You can now log in, July!"
      );
    });
    alertSpy.mockRestore();
  });
});
