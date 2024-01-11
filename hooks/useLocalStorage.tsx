import { LocalFile } from "@/lib/types";
import { getErrorMessage } from "@/lib/utils";
import { useState } from "react";

export const useLocalStorage = (
  key: string,
  initialValue: LocalFile | null
) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      const error = getErrorMessage(err);
      return {
        initialValue,
        error,
      };
    }
  });
  const setValue = (value: string | Function) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (err) {
      const error = getErrorMessage(err);
      return {
        error,
      };
    }
  };
  return [storedValue, setValue];
};
