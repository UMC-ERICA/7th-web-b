import { AxiosInstance } from "../api/axios-instance";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function useGetTodoAPI(url, id) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: [url, id],
    queryFn: async () => {
      const response = await AxiosInstance.get(url);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([url, id]);
    },
  });
  return { data, isLoading, isError };
}