import { useCallback, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export const useFetch = <T>(request: () => Promise<T[]>) => {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T[] | null>(null);

  const execute = useCallback(async () => {
    try {
      setStatus("loading");
      const result = await request();
      setData(result);
      setStatus("success");
    } catch (error) {
      error instanceof Error && setError(error.message);
      setStatus("error");
    }
  }, [request]);

  return { execute, data, status, error };
};
