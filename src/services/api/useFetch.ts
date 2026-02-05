import { useCallback, useRef, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export const useFetch = <T>(request: () => Promise<T[]>) => {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T[] | null>(null);

  const requestRef = useRef(request);
  requestRef.current = request;

  const execute = useCallback(async () => {
    try {
      setStatus("loading");
      const result = await requestRef.current();
      setData(result);
      setStatus("success");
    } catch (err) {
      err instanceof Error && setError(err.message);
      setStatus("error");
    }
  }, []);

  return { execute, data, status, error };
};
