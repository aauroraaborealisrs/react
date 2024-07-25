import { act, renderHook } from "@testing-library/react";
import useLocalStorage from "../src/hooks/useLocalStorage";

describe("useLocalStorage", () => {
  const key = "testKey";

  beforeEach(() => {
    localStorage.clear();
  });

  test("should initialize with the initial value if no value is stored", () => {
    const { result } = renderHook(() => useLocalStorage(key, "initialValue"));
    expect(result.current[0]).toBe("initialValue");
  });

  test("should retrieve the stored value from localStorage", () => {
    localStorage.setItem(key, JSON.stringify("storedValue"));
    const { result } = renderHook(() => useLocalStorage(key, "initialValue"));
    expect(result.current[0]).toBe("storedValue");
  });

  test("should store the new value in localStorage", () => {
    const { result } = renderHook(() => useLocalStorage(key, "initialValue"));

    act(() => {
      result.current[1]("newValue");
    });

    expect(localStorage.getItem(key)).toBe(JSON.stringify("newValue"));
  });

  test("should remove the value from localStorage when setting an empty value", () => {
    localStorage.setItem(key, JSON.stringify("storedValue"));
    const { result } = renderHook(() => useLocalStorage(key, "initialValue"));

    act(() => {
      result.current[1]("");
    });

    expect(localStorage.getItem(key)).toBe(null);
  });
});
