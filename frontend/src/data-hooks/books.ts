import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../axios';

const fetchBooks = async () => {
  const response = await axiosInstance.get('/books');
  return response.data;
};

const useBooks = () => {
    return useQuery({queryKey: ["books"], queryFn: fetchBooks});
};

export default useBooks;
