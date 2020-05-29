import { useState, useCallback } from "react";

const useLoadAndError = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | { message: string }>(null);
  return { loading, setLoading, error, setError };
};

/**
 * ex. cosnt [ submit, { loading, error, success} ] = useFetch("/api/private/signup", { credentials: include; method: "POST"};
 */
export const useFetch = <T>(path: string, init?: RequestInit | undefined) => {
  const { loading, setLoading, error, setError } = useLoadAndError();
  const [success, setSuccess] = useState(false);
  const fetchFunc = useCallback(async () => {
    const input = `${location.protocol}//${location.host}${path}`;
    setLoading(true);
    const res = await fetch(input, init);
    if (Math.floor(res.status / 100) !== 2) {
      const error = (await res.json()) as { message: string };
      setError({ message: error.message ?? "Some Error" });
      return error;
    }
    const body = (await res.json()) as T;
    setLoading(false);
    setSuccess(true);
    return body;
  }, [init, path, setError, setLoading]);
  return [fetchFunc, { loading, error, success }] as const;
};
