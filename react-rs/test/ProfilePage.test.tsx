import React from "react";
import { render, screen } from "@testing-library/react";
import { useGetPersonQuery } from "../src/services/api";
import ProfilePage from "../src/components/ProfilePage";

jest.mock("../src/services/api", () => ({
  ...jest.requireActual("../src/services/api"),
  useGetPersonQuery: jest.fn(),
}));

describe("ProfilePage", () => {
  const mockUseGetPersonQuery = useGetPersonQuery as jest.MockedFunction<
    typeof useGetPersonQuery
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state", () => {
    mockUseGetPersonQuery.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
      refetch: jest.fn(),
      isFetching: false,
      fulfilledTimeStamp: 0,
      endpointName: "getPerson",
      startedTimeStamp: 0,
    });

    render(<ProfilePage name="Luke Skywalker" />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders no data state", () => {
    mockUseGetPersonQuery.mockReturnValue({
      data: { results: [] },
      isLoading: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
      isFetching: false,
      fulfilledTimeStamp: 0,
      endpointName: "getPerson",
      startedTimeStamp: 0,
    });

    render(<ProfilePage name="Luke Skywalker" />);

    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  test("renders profile data", () => {
    mockUseGetPersonQuery.mockReturnValue({
      data: {
        results: [
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
        ],
      },
      isLoading: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
      isFetching: false,
      fulfilledTimeStamp: 0,
      endpointName: "getPerson",
      startedTimeStamp: 0,
    });

    render(<ProfilePage name="Luke Skywalker" />);

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Height: 172 cm")).toBeInTheDocument();
    expect(screen.getByText("Mass: 77 kg")).toBeInTheDocument();
    expect(screen.getByText("Hair Color: blond")).toBeInTheDocument();
    expect(screen.getByText("Skin Color: fair")).toBeInTheDocument();
    expect(screen.getByText("Eye Color: blue")).toBeInTheDocument();
    expect(screen.getByText("Birth Year: 19BBY")).toBeInTheDocument();
    expect(screen.getByText("Gender: male")).toBeInTheDocument();
  });
});
