import { AxiosInstance } from "../api/axios-instance";

import { useQuery } from "@tanstack/react-query";

export default function useGetAPI(url) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [url],
    queryFn: async () => {
      const response = await AxiosInstance.get(url);
      return response.data;
    },
  });

  return { data, isLoading, isError };
};
