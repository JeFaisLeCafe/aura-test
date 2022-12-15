import { ApiMonetizationsParams, ApiMonetization } from "../dataFormat";
import { API_URL } from "../constantes";
import axios from "axios";
import { useEffect, useState } from "react";

const useFetchData = ({
  aggregates,
  start,
  end,
  dimensions
}: ApiMonetizationsParams) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ApiMonetization[]>([]);

  console.log({ aggregates, start, end, dimensions });

  function refetch(params: ApiMonetizationsParams) {
    fetchData(params);
  }

  useEffect(() => {
    fetchData({ aggregates, start, end, dimensions });
  }, [aggregates, start, end, dimensions]);

  const fetchData = async (params: ApiMonetizationsParams) => {
    try {
      setIsLoading(true);
      setError("");
      const data = await axios.get<ApiMonetization[]>(API_URL, {
        params: params
      });
      setData(data.data);
    } catch (e) {
      console.warn("ERROR fetchhing data", e);
      setError(`ERROR fetchhing data: ${e}`);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, refetch };
};

export default useFetchData;
