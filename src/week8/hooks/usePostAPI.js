import { AxiosInstance } from "../api/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function usePostAPI(url) {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: async (data) => {
      const response = await AxiosInstance.post(url, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([url]);
    },
  });
  return { postData: mutate, isLoading, isError };
}
