import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../utils/axios';
import { Store } from '../types/types';

const fetchStores = async (): Promise<Store[]> => {
  const response = await axiosInstance.get('/stores');
  return response.data;
};

const useStores = () => {
  return useQuery({
    queryKey: ['stores'],
    queryFn: fetchStores,
  });
};

export default useStores;
