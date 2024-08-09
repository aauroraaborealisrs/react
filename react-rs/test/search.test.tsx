import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Search, { getServerSideProps, SearchProps } from "../src/pages/search";
import { NextRouter } from "next/router";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { Provider } from "react-redux";
import { store as appStore } from "../src/store/store";

export function createMockRouter(router: Partial<NextRouter>): NextRouter {
  return {
    basePath: "",
    pathname: "/",
    route: "/",
    query: {},
    asPath: "/",
    back: jest.fn(),
    beforePopState: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    push: jest.fn().mockResolvedValue(true),
    reload: jest.fn(),
    forward: jest.fn(),
    replace: jest.fn().mockResolvedValue(true),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isReady: true,
    isLocaleDomain: false,
    isPreview: false,
    ...router,
  };
}

import { ReactNode } from "react";

jest.mock("next/link", () => {
  return ({ children }: { children: ReactNode }) => {
    return children;
  };
});

describe("Search Component", () => {
  const mockProps: SearchProps = {
    characters: [
      { name: "Luke Skywalker", url: "/people/1/" },
      { name: "Darth Vader", url: "/people/4/" },
    ],
    query: "Luke",
    page: 1,
    next: "/api/people/?search=Luke&page=2",
    previous: null,
  };

  it("renders the CharacterList component with characters", () => {
    render(
      <Provider store={appStore}>
        <RouterContext.Provider value={createMockRouter({})}>
          <Search {...mockProps} />
        </RouterContext.Provider>
      </Provider>,
    );

    const characterListItems = screen.getAllByText(
      /Luke Skywalker|Darth Vader/i,
    );
    expect(characterListItems.length).toBe(2);
  });

  it("renders the Previous and Next buttons with correct states", () => {
    render(
      <Provider store={appStore}>
        <RouterContext.Provider value={createMockRouter({})}>
          <Search {...mockProps} />
        </RouterContext.Provider>
      </Provider>,
    );

    const previousButton = screen.getByText(/Previous/i);
    const nextButton = screen.getByText(/Next/i);

    expect(previousButton).toBeDisabled();
    expect(nextButton).toBeEnabled();
  });

  it("renders the Next button correctly when next is available", () => {
    const propsWithNext: SearchProps = {
      ...mockProps,
      next: "/api/people/?search=Luke&page=2",
    };

    render(
      <Provider store={appStore}>
        <RouterContext.Provider value={createMockRouter({})}>
          <Search {...propsWithNext} />
        </RouterContext.Provider>
      </Provider>,
    );

    const nextButton = screen.getByText(/Next/i);
    expect(nextButton).toBeEnabled();
  });

  it("renders the Previous button correctly when previous is available", () => {
    const propsWithPrevious: SearchProps = {
      ...mockProps,
      previous: "/api/people/?search=Luke&page=0",
    };

    render(
      <Provider store={appStore}>
        <RouterContext.Provider value={createMockRouter({})}>
          <Search {...propsWithPrevious} />
        </RouterContext.Provider>
      </Provider>,
    );

    const previousButton = screen.getByText(/Previous/i);
    expect(previousButton).toBeEnabled();
  });
});

import { GetServerSidePropsContext } from "next";
import fetchMock from "jest-fetch-mock";

describe("getServerSideProps", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("fetches data and returns props correctly", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        results: [
          { name: "Luke Skywalker", url: "/people/1/" },
          { name: "Darth Vader", url: "/people/4/" },
        ],
        next: "/api/people/?search=Luke&page=2",
        previous: null,
      }),
    );

    const context = {
      query: { query: "Luke", page: "1" },
    } as unknown as GetServerSidePropsContext;

    const response = await getServerSideProps(context);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://swapi.dev/api/people/?search=Luke&page=1",
    );

    expect(response).toEqual({
      props: {
        characters: [
          { name: "Luke Skywalker", url: "/people/1/" },
          { name: "Darth Vader", url: "/people/4/" },
        ],
        query: "Luke",
        page: 1,
        next: "/api/people/?search=Luke&page=2",
        previous: null,
      },
    });
  });

  it("handles missing query and page correctly", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        results: [],
        next: null,
        previous: null,
      }),
    );

    const context = {
      query: {},
    } as unknown as GetServerSidePropsContext;

    const response = await getServerSideProps(context);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://swapi.dev/api/people/?search=&page=1",
    );

    expect(response).toEqual({
      props: {
        characters: [],
        query: "",
        page: 1,
        next: null,
        previous: null,
      },
    });
  });
});
