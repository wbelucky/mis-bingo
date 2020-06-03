import { useState, ChangeEvent, useCallback } from "react";
import { UserWithAccount } from "../../../domain/user";

export const useTextInput = (initialValue?: string) => {
  const [value, setValue] = useState<string>(initialValue ?? "");
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [setValue]
  );
  return { value, onChange: handleChange };
};

export type TextInputComponent = React.FC<ReturnType<typeof useTextInput>>;
