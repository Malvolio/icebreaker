import { useEffect, useState } from "react";
import create from "zustand";
import { combine } from "zustand/middleware";

const useStorageChecker = create(
  combine(
    {
      count: 0,
    },
    (set) => ({
      bump: () =>
        set(({ count }) => ({
          count: count + 1,
        })),
    })
  )
);

const useLocalStorage = <T>(
  key: string,
  initialValue?: T
): [T | undefined, (_: T) => void, () => void] => {
  const { count, bump } = useStorageChecker();
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      const v = window.localStorage.getItem(key);
      setStoredValue((oldValue) =>
        v === null
          ? initialValue
          : JSON.stringify(oldValue) === v
          ? oldValue
          : JSON.parse(v)
      );
    }
  }, [count]);
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T | undefined) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        bump();
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  const deleteValue = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
      bump();
    }
  };
  return [storedValue, setValue, deleteValue];
};

export default useLocalStorage;
