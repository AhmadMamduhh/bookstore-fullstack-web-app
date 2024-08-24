import prisma from '../prismaClient';

const getBooksInStore = (storeId: number) =>
  prisma.store.findUnique({
    where: { id: storeId },
    include: { books: true }
  });

const addBookToStore = (storeId: number, data: { bookId: number; price: number; soldOut: boolean }) =>
  prisma.storeBook.create({ data: { ...data, storeId } });

const updateBookInStore = (storeId: number, bookId: number, data: { price?: number; soldOut?: boolean }) =>
  prisma.storeBook.update({
    where: { storeId_bookId: { storeId, bookId } },
    data
  });

const removeBookFromStore = (storeId: number, bookId: number) =>
  prisma.storeBook.delete({ where: { storeId_bookId: { storeId, bookId } } });

const markBookAsSoldInStore = async (storeId: number, bookId: number): Promise<void> => {
    try {
      await prisma.storeBook.updateMany({
        where: {
          storeId,
          bookId,
        },
        data: {
          soldOut: true,
        },
      });
    } catch (error) {
      throw new Error('Failed to mark book as sold in store');
    }
  };

export default {
  getBooksInStore,
  addBookToStore,
  updateBookInStore,
  removeBookFromStore,
  markBookAsSoldInStore
};
