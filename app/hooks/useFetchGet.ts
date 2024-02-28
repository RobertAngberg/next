import { useEffect, useState } from "react";

const useFetchGet = (url: string) => {
  const [fetchData, setFetchData] = useState<any | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://localhost:3000/` + url);
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
};

export default useFetchGet;
