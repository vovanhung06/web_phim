import { useEffect, useState } from "react";

const DEFAULT_HEADERS = {
  accept: "application/json",
  Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
};

export default function useFetchtm(
  { url = "", method = "GET", headers = {} },
  endabled = true,
) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
      if(!endabled) return
      setIsLoading(true);
      fetch(url, {
        method,
        headers: {
          ...DEFAULT_HEADERS,
          ...headers,
        },
      })
        .then((res) => res.json())
        .then((res) => setData(res))
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }, [url, method, JSON.stringify(headers)]);
    return [isLoading, data, endabled];
  }
