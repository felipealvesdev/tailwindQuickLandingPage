import { StationsResponse } from "@/interfaces/ApiResponse";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

interface MapMarkersFetchState {
  data: StationsResponse[] | undefined;
  loading: boolean;
  error: AxiosError | null;
}

function useStations({
  url,
  token,
}: {
  url: string;
  token: string;
}): MapMarkersFetchState {
  const [data, setData] = useState<StationsResponse[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get<StationsResponse[]>(url, {
          headers: token ? { Authorization: `Token ${token}` } : undefined,
        });
        setData(data);
      } catch (error) {
        if (error instanceof AxiosError) {
          return setError(error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useStations;
