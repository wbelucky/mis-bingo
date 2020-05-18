import { useState, useCallback, useMemo } from "react";
import { load } from "dotenv/types";

const useLoadAndError = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | { message: string }>(null);
  return { loading, setLoading, error, setError };
};

/**
 * ex. cosnt [ submit, { loading, error, success} ] = useFetch("/api/private/signup", { credentials: include; method: "POST"};
 */
export const useFetch = <T>(path: string, init?: RequestInit | undefined) => {
  const input = `${location.protocol}//${location.host}${path}`;
  const { loading, setLoading, error, setError } = useLoadAndError();
  const fetchFunc = useCallback(async () => {
    const res = await fetch(input, init);
    if (Math.floor(res.status / 100) !== 2) {
      const error = (await res.json()) as { message: string };
      setError({ message: error.message ?? "Some Error" });
      return error;
    }
    const body = (await res.json()) as T;
    setLoading(true);
    return body;
  }, [init, input, setError, setLoading]);
  const success = useMemo(() => !loading && !!error, [error, loading]);
  return [fetchFunc, { loading, error, success }] as const;
};
