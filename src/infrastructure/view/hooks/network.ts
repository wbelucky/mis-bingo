import { useState, useCallback } from "react";

export type FrontendError = { message: string };

const useLoadAndError = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | FrontendError>(null);
  return { loading, setLoading, error, setError };
};

/**
 * ex. cosnt [ submit, { loading, error, success} ] = useFetch("/api/private/signup", { credentials: include; method: "POST"};
 */
export const useFetch = <Req, Res>(path: string, init: (body: string) => RequestInit) => {
  const { loading, setLoading, error, setError } = useLoadAndError();
  const [success, setSuccess] = useState(false);
  const fetchFunc = useCallback(
    async (reqBody: Req) => {
      const input = `${location.protocol}//${location.host}${path}`;
      setLoading(true);
      const res = await fetch(input, init(JSON.stringify(reqBody)));
      if (Math.floor(res.status / 100) !== 2) {
        const error = (await res.json()) as { message: string };
        setError({ message: error.message ?? "Some Error" });
        setLoading(false);
        return error;
      }
      const body = (await res.json()) as Res;
      setLoading(false);
      setSuccess(true);
      return body;
    },
    [init, path, setError, setLoading]
  );
  return [fetchFunc, { loading, error, success }] as const;
};
