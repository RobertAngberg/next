import { useEffect, useState } from "react";

function useFetchGet(url: string) {
  const [fetchData, setFetchData] = useState<any | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://next-nu-brown.vercel.app/` + url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setFetchData(jsonData);
      } catch (error) {
        setError(error as Error);
      }
    };
    fetchData();
  }, [url]); // Glöm ej

  return { error, fetchData };
}

export { useFetchGet };
