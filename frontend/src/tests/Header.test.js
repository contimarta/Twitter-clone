import {
    render,
    screen,
    fireEvent,
    
  } from "@testing-library/react";
  import Header from "../components/Header/Header.jsx";


test("removes token from local storage when logout button is clicked", () => {
  const localStorageMock = {
    removeItem:jest.fn()
  };

  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
  });
  
    render(<Header isLoggedIn={true} setIsLoggedIn={() => {}} />);
    fireEvent.click(screen.getByText("LOG OUT"));
  
    expect(localStorage.removeItem).toHaveBeenCalledWith("token");
  });