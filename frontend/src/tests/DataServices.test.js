import axios from "axios";
import {
  newPeep,
  peepList,
  newComment,
  getToken,
} from "../utils/DataServices.js";

jest.mock("axios");

describe("Peep Services", () => {
  const token = "test-token";

  beforeEach(() => {
    axios.post.mockClear();
    axios.get.mockClear();

    //code to mock the localStorage taken from https://robertmarshall.dev/blog/how-to-mock-local-storage-in-jest-tests/
    const localStorageMock = (function () {
      let store = { token: "test-token" };

      return {
        getItem(key) {
          return store[key];
        },
      };
    })();

    Object.defineProperty(window, "localStorage", { value: localStorageMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getToken function", () => {
    const result = getToken();
    expect(result).toEqual(token);
  });

  test("newPeep successful", async () => {
    const peepText = "New peep";
    axios.post.mockResolvedValueOnce({ data: { content: peepText } });

    const result = await newPeep(peepText);

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:5000/peeps",
      { content: peepText },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    expect(result).toEqual({ content: peepText });
  });

  test("newPeep failed", async () => {
    const peepText = "New peep";
    const errorMessage = "Request failed with status code 400";
    axios.post.mockRejectedValueOnce(new Error(errorMessage));

    const result = await newPeep(peepText);

    expect(result.error).toBe(errorMessage);
  });

  test("peepList successful", async () => {
    const peeps = [{ content: "Peep 1" }, { content: "Peep 2" }];
    axios.get.mockResolvedValueOnce({ data: peeps });

    const result = await peepList();

    expect(axios.get).toHaveBeenCalledWith("http://localhost:5000/peeps");
    expect(result).toEqual(peeps);
  });

  test("peepList failed", async () => {
    const errorMessage = "Request failed with status code 400";
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    const result = await peepList();

    expect(result.error).toBe(errorMessage);
  });

  test("newComment successful", async () => {
    const commentText = "New comment";
    const peepId = "1";
    axios.post.mockResolvedValueOnce({
      data: { content: commentText, peepId },
    });

    const result = await newComment(commentText, peepId);

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:5000/peeps/comment",
      { content: commentText, peepId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    expect(result).toEqual({ content: commentText, peepId });
  });

  test("newComment failed", async () => {
    const commentText = "New comment";
    const peepId = "1";
    const errorMessage = "Request failed with status code 400";
    axios.post.mockRejectedValueOnce(new Error(errorMessage));

    const result = await newComment(commentText, peepId);

    expect(result.error).toBe(errorMessage);
  });
});
