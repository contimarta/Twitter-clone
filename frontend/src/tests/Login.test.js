import React from "react";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../components/Header/Login/Login.jsx";
import { logIn } from "../utils/AuthServices.js";

jest.mock("../utils/AuthServices.js");

describe("Login component tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("login form is not visible by default", () => {
    //arrange
    render(<Login />);
    //assert
    expect(screen.queryByLabelText(/Email:/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Password:/i)).not.toBeInTheDocument();
  });

  test("login form is displayed when LOG IN button is clicked", () => {
    //arrange
    render(<Login />);
    //act
    act(() => {
      fireEvent.click(screen.getByText(/LOG IN/i));
    });
    //assert
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
  });

  test("login form is hidden when BACK button is clicked", () => {
    //arrange
    render(<Login />);
    //act
    act(() => {
      fireEvent.click(screen.getByText(/LOG IN/i));
    });
    act(() => {
      fireEvent.click(screen.getByText(/BACK/i));
    });
    //assert
    expect(screen.queryByLabelText(/Email:/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Password:/i)).not.toBeInTheDocument();
  });

  test("input fields are updated when the user types", () => {
    //arrange
    render(<Login />);
    act(() => {
      fireEvent.click(screen.getByText(/LOG IN/i));
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
    //assert
    expect(screen.getByLabelText(/Email:/i)).toHaveValue("test@chitter.com");
    expect(screen.getByLabelText(/Password:/i)).toHaveValue("password123");
  });

  test("logIn function is called with correct input values when the form is submitted", async () => {
    //arrange
    const setIsLoggedIn = jest.fn();
    const setName = jest.fn();
    render(<Login setIsLoggedIn={setIsLoggedIn} setName={setName} />);
    //act
    act(() => {
      fireEvent.click(screen.getByText(/LOG IN/i));
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
      fireEvent.submit(screen.getByText("LOG IN"));
      
    });
    //assert
    await waitFor(() => {
      expect(logIn).toHaveBeenCalledWith({
        email: "test@chitter.com",
        password: "password123",
      });
    });
  });

  test("setIsLoggedIn and setName are called with the correct values after a successful login", async () => {
    //arrange
    logIn.mockResolvedValue({
      token: "test-token",
      user: { name: "Anne" },
    });
    const setIsLoggedIn = jest.fn();
    const setName = jest.fn();
    render(<Login setIsLoggedIn={setIsLoggedIn} setName={setName} />);
    //act
    fireEvent.click(screen.getByText(/LOG IN/i));
    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: "test@chitter.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: "password123" },
    });
    fireEvent.submit(screen.getByText("LOG IN"));
    //assert
    await waitFor(() => {
      expect(setIsLoggedIn).toHaveBeenCalledWith(true);
      expect(setName).toHaveBeenCalledWith("Anne");
    });
  });
  test("alert is displayed if user enters wrong email or password", async () => {
    //arrange
    logIn.mockRejectedValue(new Error("Incorrect email or password"));
    const setIsLoggedIn = jest.fn();
    const setName = jest.fn();
    render(<Login setIsLoggedIn={setIsLoggedIn} setName={setName} />);
    //act
    fireEvent.click(screen.getByText(/LOG IN/i));
    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: "test@chitter.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: "wrongpassword" },
    });
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    fireEvent.submit(screen.getByText("LOG IN"));
    //assert
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("Incorrect email or password");
    });
    alertSpy.mockRestore();
  });
});
