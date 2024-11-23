import { AxiosInstance } from "../api/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteAPI(url) {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: async (id) => {
      const response = await AxiosInstance.delete(`${url}/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([url]);
    },
  });
  return { deleteData: mutate, isLoading, isError };
}

