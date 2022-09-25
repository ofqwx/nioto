import { act, renderHook } from "@testing-library/react-hooks";
import { useLocalStorage } from "../hooks";

describe("use local storage hook", () => {
  it("should set state with initial value if provided if local storage key is empty", () => {
    const { result } = renderHook(() =>
      useLocalStorage("test", "initial item value")
    );
    const value = result.current[0];

    expect(value).toBe("initial item value");
  });

  it("should set state and window local storage", () => {
    const { result } = renderHook(() => useLocalStorage("test"));

    act(() => {
      result.current[1]("test value");
    });

    expect(result.current[0]).toBe("test value");
    expect(window.localStorage.getItem("test")).toBe("\"test value\"");
  });

  it("should update local state if local storage is mutated", () => {
    jest
      .spyOn(window, "addEventListener")
      .mockImplementationOnce((_, handler) => {
        handler({ key: "test", newValue: "\"test value\"" });
      });
    const { result } = renderHook(() => useLocalStorage("test"));

    expect(result.current[0]).toBe("test value");
  });
});
