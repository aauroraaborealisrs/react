import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import CardList from "../src/components/CardList";
import { selectItem, unselectItem } from "../src/store/peopleSlice";
import { Character } from "../src/interfaces";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  NavLink: jest
    .fn()
    .mockImplementation(({ to, children }) => <a href={to}>{children}</a>),
}));

describe("CardList", () => {
  const mockDispatch = jest.fn();
  const mockUseSelector = useSelector as jest.MockedFunction<
    typeof useSelector
  >;

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    jest.clearAllMocks();
  });

  const mockPeople: Character[] = [
    {
      name: "Luke Skywalker",
      height: "172",
      mass: "77",
      hair_color: "blond",
      skin_color: "fair",
      eye_color: "blue",
      birth_year: "19BBY",
      gender: "male",
    },
    {
      name: "Darth Vader",
      height: "202",
      mass: "136",
      hair_color: "none",
      skin_color: "white",
      eye_color: "yellow",
      birth_year: "41.9BBY",
      gender: "male",
    },
  ];

  test('renders "No one was found" when there are no people', () => {
    mockUseSelector.mockReturnValue([]);

    render(
      <MemoryRouter>
        <CardList people={[]} searchQuery="" currentPage={1} />
      </MemoryRouter>,
    );

    expect(screen.getByText("No one was found")).toBeInTheDocument();
  });

  test("renders list of people", () => {
    mockUseSelector.mockReturnValue([]);

    render(
      <MemoryRouter>
        <CardList people={mockPeople} searchQuery="Luke" currentPage={1} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Darth Vader")).toBeInTheDocument();
  });

  test("checks and unchecks the checkbox and dispatches appropriate actions", () => {
    mockUseSelector.mockReturnValue([{ name: "Luke Skywalker" }]);

    render(
      <MemoryRouter>
        <CardList people={mockPeople} searchQuery="Luke" currentPage={1} />
      </MemoryRouter>,
    );

    const lukeCheckbox = screen.getByTestId("checkbox-Luke Skywalker");
    const vaderCheckbox = screen.getByTestId("checkbox-Darth Vader");

    expect(lukeCheckbox).toBeChecked();
    expect(vaderCheckbox).not.toBeChecked();

    fireEvent.click(vaderCheckbox);
    expect(mockDispatch).toHaveBeenCalledWith(selectItem(mockPeople[1]));

    fireEvent.click(lukeCheckbox);
    expect(mockDispatch).toHaveBeenCalledWith(unselectItem("Luke Skywalker"));
  });
});
