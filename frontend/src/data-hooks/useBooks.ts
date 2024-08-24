import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../utils/axios';
import { Book } from '../types/types';

const fetchBooks = async (): Promise<Book[]> => {
  const response = await axiosInstance.get('/books');
  return response.data;
};

const useBooks = () => {
  return useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });
};

export default useBooks;
