import { useCallback, useRef, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export const useFetch = <T>(request: () => Promise<T[]>) => {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T[] | null>(null);

  const requestRef = useRef(request);
  requestRef.current = request;

  const requestIdRef = useRef(0);

  const execute = useCallback(async (replace = false) => {
    const requestId = ++requestIdRef.current;

    setStatus("loading");
    setError(null);

    try {
      const result = await requestRef.current();

      if (requestId !== requestIdRef.current) {
        return;
      }

      setData(prev => (replace ? result || [] : [...(prev || []), ...(result || [])]));
      setStatus("success");
    } catch (err) {
      if (requestId !== requestIdRef.current) {
        return;
      }

      if (err instanceof Error) {
        setError(err.message);
      }
      setStatus("error");
    }
  }, []);

  return { execute, data, status, error };
};
