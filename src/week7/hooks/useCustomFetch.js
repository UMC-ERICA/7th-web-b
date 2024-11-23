import { useEffect, useState } from "react";
import { AxiosInstance } from "../api/axios-instance.js";

const useCustomFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // 데이터를 받아오는 중까지는 로딩처리를 하는 게 맞다.
      try {
        const response = await AxiosInstance.get(url);
        setData(response.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, isLoading, isError };
};

export default useCustomFetch;
