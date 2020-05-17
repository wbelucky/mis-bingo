import { useState, ChangeEvent, useCallback } from "react";
import { User } from "../../protcol/user";

export const useTextInput = (initialValue?: string) => {
  const [value, setValue] = useState<string>(initialValue ?? "");
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [setValue]
  );
  return { value, handleChange };
};
