import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import Main from "../components/Main/Main.jsx";

describe("Main component tests", () => {
  let peeps;
  let uploadPeeps;
  beforeEach(() => {
    peeps = [
      {
        _id: {
          $oid: "641df7cf8a7f87a01da3e6d7",
        },
        content: "this is my first peep",
        user: {
          $oid: "641c8c0e07e646bd3fa7ac2c",
        },
        comments: [
          {
            content: "first comment",
            user: {
              $oid: "641c8c0e07e646bd3fa7ac2c",
            },
            username: "martaconti",
            _id: {
              $oid: "641df7e28a7f87a01da3e6dd",
            },
            createdAt: {
              $date: "2023-03-24T19:20:02.769Z",
            },
            updatedAt: {
              $date: "2023-03-24T19:20:02.769Z",
            },
          },
          {
            content: "second comment",
            user: {
              $oid: "641c8c0e07e646bd3fa7ac2c",
            },
            username: "martaconti",
            _id: {
              $oid: "641df8e298b59ec67e09365c",
            },
            createdAt: {
              $date: "2023-03-24T19:24:18.509Z",
            },
            updatedAt: {
              $date: "2023-03-24T19:24:18.509Z",
            },
          },
        ],
        createdAt: {
          $date: "2023-03-24T19:19:43.892Z",
        },
        updatedAt: {
          $date: "2023-03-24T19:24:18.510Z",
        },
        __v: 2,
      },
    ];
    uploadPeeps = jest.fn();
  });
  test("renders NewPeep component when isLoggedIn is true", () => {
    render(<Main peeps={peeps} uploadPeeps={uploadPeeps} isLoggedIn={true} />);

    expect(
      screen.getByPlaceholderText("What's happening?")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("You need to log in to peep and add comments!")
    ).not.toBeInTheDocument();
  });

  test("renders message when isLoggedIn is false", () => {
    render(<Main peeps={peeps} uploadPeeps={uploadPeeps} isLoggedIn={false} />);

    expect(
      screen.getByText("You need to log in to peep and add comments!")
    ).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("What's happening?")).not.toBeInTheDocument();
  });

  test("renders PeepList component when peeps array is not empty", () => {
    render(<Main peeps={peeps} uploadPeeps={uploadPeeps} isLoggedIn={true} />);

    expect(screen.getByText("this is my first peep")).toBeInTheDocument();

    expect(screen.queryByText("Peeps are loading...")).not.toBeInTheDocument();
  });

  test("renders loading message when peeps array is empty", () => {
    const peeps = [];
    const uploadPeeps = jest.fn();

    render(<Main peeps={peeps} uploadPeeps={uploadPeeps} isLoggedIn={true} />);

    expect(screen.getByText("Peeps are loading...")).toBeInTheDocument();
  });

  test("renders Peeps comments when peeps array is not empty", () => {
    render(<Main peeps={peeps} uploadPeeps={uploadPeeps} isLoggedIn={true} />);
    act(() => {
      fireEvent.click(screen.getByText(/View comments/i));
    });

    expect(screen.getByText("first comment")).toBeInTheDocument();
    expect(screen.getByText("second comment")).toBeInTheDocument();
  });
});
