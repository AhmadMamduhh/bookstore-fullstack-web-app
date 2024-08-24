import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

interface SellBookParams {
  storeId: number;
  bookId: number;
}

const sellBook = async ({ storeId, bookId }: SellBookParams): Promise<void> => {
  await axiosInstance.patch(`/stores/${storeId}/books/${bookId}/sell`);
};

export const useSellBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sellBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] }); 
    },
  });
};


export default useBooks;
