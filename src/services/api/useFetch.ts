import { useCallback, useState } from "react";
import { api } from "./api";

type Status = "idle" | "loading" | "success" | "error";
type Method = "GET" | "DELETE" | "POST" | "PATCH" | "PUT";

export const useFetch = (url: string) => {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState(null);

  const execute = useCallback(
    async (method: Method) => {
      try {
        setStatus("loading");
        const response = await api({ url, method });
        setData(response.data);
        setStatus("success");
      } catch (error) {
        error instanceof Error && setError(error.message);
        setStatus("error");
      }
    },
    [url],
  );

  return { data, error, status, execute };
};
