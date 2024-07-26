import fetchMock from "jest-fetch-mock";
import store from "../src/store/store";
import { Character } from "../src/interfaces";
import { fetchProfile, ProfileState } from "../src/store/profileSlice";

fetchMock.enableMocks();

describe("profileSlice", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should return the initial state", () => {
    const initialState: ProfileState = {
      person: null,
      loading: false,
      error: null,
    };

    expect(store.getState().profile).toEqual(initialState);
  });

  it("should handle fetchProfile.pending", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ results: [] }));

    store.dispatch(fetchProfile("Luke Skywalker"));

    const expectedState: ProfileState = {
      person: null,
      loading: true,
      error: null,
    };

    expect(store.getState().profile).toEqual(expectedState);
  });

  it("should handle fetchProfile.fulfilled", async () => {
    const character: Character = {
      name: "Luke Skywalker",
      height: "172",
      mass: "77",
      hair_color: "blond",
      skin_color: "fair",
      eye_color: "blue",
      birth_year: "19BBY",
      gender: "male",
    };
    fetchMock.mockResponseOnce(JSON.stringify({ results: [character] }));

    await store.dispatch(fetchProfile("Luke Skywalker"));

    const expectedState: ProfileState = {
      person: character,
      loading: false,
      error: null,
    };

    expect(store.getState().profile).toEqual(expectedState);
  });

  it("should handle fetchProfile.rejected", async () => {
    fetchMock.mockRejectOnce(new Error("Network response was not ok"));

    await store.dispatch(fetchProfile("Luke Skywalker"));

    const expectedState: ProfileState = {
      person: {
        name: "Luke Skywalker",
        height: "172",
        mass: "77",
        hair_color: "blond",
        skin_color: "fair",
        eye_color: "blue",
        birth_year: "19BBY",
        gender: "male",
      },
      loading: false,
      error: "Network response was not ok",
    };

    expect(store.getState().profile).toEqual(expectedState);
  });
});
