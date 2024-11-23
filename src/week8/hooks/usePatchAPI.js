import { AxiosInstance } from "../api/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function usePatchAPI(url) {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, isCompleted } = useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await AxiosInstance.patch(`${url}/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([url]);
    },
  });
  return { patchData: mutate, isLoading, isError, isCompleted };
}
