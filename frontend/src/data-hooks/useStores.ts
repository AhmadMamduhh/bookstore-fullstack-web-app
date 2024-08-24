import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../utils/axios';
import { Store } from '../types/types';

const fetchStores = async (): Promise<Store[]> => {
  const response = await axiosInstance.get('/stores');
  return response.data;
};

const addStore = async (newStore: Omit<Store, 'id' | 'books'>): Promise<Store> => {
  const response = await axiosInstance.post('/stores', newStore);
  return response.data;
};

const updateStore = async (store: Store): Promise<Store> => {
  const response = await axiosInstance.put(`/stores/${store.id}`, store);
  return response.data;
};

const deleteStore = async (storeId: number): Promise<void> => {
  await axiosInstance.delete(`/stores/${storeId}`);
};

export const useStores = () => {
  return useQuery({
    queryKey: ['stores'],
    queryFn: fetchStores,
  });
};

export const useAddStore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addStore,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["stores"]}),
  });
};

export const useUpdateStore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateStore,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["stores"]}),
  });
};

export const useDeleteStore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteStore,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["stores"]}),
  });
};
