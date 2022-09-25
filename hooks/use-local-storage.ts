import { useEffect, useState, useCallback, useMemo } from "react";

export default function useLocalStorage<StoredValueType>(
  key: string,
  initialValue = ""
): [
  currentValue: StoredValueType,
  setValue: (newValue: StoredValueType) => void
] {
  const memoizedInitialValue = useMemo(() => {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    }

    return initialValue;
  }, [initialValue, key]);

  const [storedValue, setStoredValue] =
    useState<StoredValueType>(memoizedInitialValue);

  const storageChangeHandler = useCallback(
    (e: StorageEvent) => {
      const { key: changeKey, newValue } = e;

      if (key === changeKey) {
        setStoredValue(JSON.parse(String(newValue)));
      }
    },
    [key]
  );

  useEffect(() => {
    window.addEventListener("storage", storageChangeHandler);

    return () => window.removeEventListener("storage", storageChangeHandler);
  }, [storageChangeHandler]);

  const setValue = useCallback(
    (newValue: StoredValueType) => {
      if (newValue !== storedValue) {
        setStoredValue(newValue);
        window.localStorage.setItem(key, JSON.stringify(newValue));
      }
    },
    [storedValue, key]
  );

  return [storedValue, setValue];
}
