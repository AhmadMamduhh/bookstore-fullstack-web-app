import prisma from '../prismaClient';

export const getAllBooks = () => {
  return prisma.book.findMany({
    include: {
      author: true,
      stores: {
        include: {
          store: true
        }
      }
    }
  });
};

export const getBookById = (id: number) => {
  return prisma.book.findUnique({
    where: { id },
    include: {
      author: true,
      stores: {
        include: {
          store: true
        }
      }
    }
  });
};

const createBook = (data: { name: string; pages: number; authorId: number }) =>
  prisma.book.create({ data });
const updateBook = (id: number, data: { name?: string; pages?: number; authorId?: number }) =>
  prisma.book.update({ where: { id }, data });
const deleteBook = (id: number) => prisma.book.delete({ where: { id } });


export default {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
