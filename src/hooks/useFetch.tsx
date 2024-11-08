import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/interfaces/ApiResponse";

interface FetchState {
  data: ApiResponse | null;
  loading: boolean;
  error: AxiosError | null;
}

function useFetch(url: string, token?: string): FetchState {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // console.log(token, url);
      setLoading(true);
      try {
        const response = await axios.get<ApiResponse>(url, {
          headers: token ? { Authorization: `Token ${token}` } : undefined,
        });
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err as AxiosError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
