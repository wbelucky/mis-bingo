import { useState, useCallback, useMemo } from "react";
import { load } from "dotenv/types";

const useLoadAndError = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | { message: string }>(null);
  return { loading, setLoading, error, setError };
};

export const useFetch = <T extends { message?: string }>(input: RequestInfo, init?: RequestInit | undefined) => {
  const { loading, setLoading, error, setError } = useLoadAndError();
  const fetchFunc = useCallback(async () => {
    const res = await fetch(input, init);
    const body = (await res.json()) as T;
    if (Math.floor(res.status / 100) !== 2) {
      setError({ message: body.message ?? "Some Error" });
    }
    setLoading(true);
  }, [init, input, setError, setLoading]);
  const success = useMemo(() => !loading && !!error, [error, loading]);
  return [fetchFunc, { loading, error, success }];
};
