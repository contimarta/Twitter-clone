import axios from "axios";
import { logIn, signUp } from "../utils/AuthServices.js";

jest.mock("axios");

describe("Auth Functions", () => {
  describe("logIn function tests", () => {
    beforeEach(() => {
     
      axios.post.mockClear();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test("successful login", async () => {
      const localStorageMock = {
        setItem: jest.fn(),
      };

      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      const formData = { email: "test@example.com", password: "password123" };
      const token = "test-token";
      axios.post.mockResolvedValueOnce({ data: { token } });

      const result = await logIn(formData);

      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:5000/users/login",
        formData
      );
      expect(localStorage.setItem).toHaveBeenCalledWith("token", token);
      expect(result).toEqual({ token });
    });

    test("failed login", async () => {
      const formData = { email: "test@example.com", password: "password123" };
      const errorMessage = "Request failed with status code 400";
      axios.post.mockRejectedValueOnce(new Error(errorMessage));

      const result = await logIn(formData);

      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:5000/users/login",
        formData
      );
      expect(result.error).toBe(errorMessage);
    });
  });

  describe("signUp function tests", () => {
    test("successful registration", async () => {
      const formData = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      };
      const response = { message: "Registration successful!" };
      axios.post.mockResolvedValueOnce({ data: response });

      const result = await signUp(formData);

      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:5000/users/register",
        formData
      );
      expect(result).toEqual(response);
    });

    test("failed registration", async () => {
      const formData = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      };
      const errorMessage = "Validation error";
      axios.post.mockRejectedValueOnce({
        response: { data: { errors: errorMessage } },
      });

      const result = await signUp(formData);

      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:5000/users/register",
        formData
      );
      expect(result.error).toBe(errorMessage);
    });
  });
});
