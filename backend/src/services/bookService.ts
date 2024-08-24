import prisma from '../prismaClient';

const getAllBooks = () => prisma.book.findMany();
const getBookById = (id: number) => prisma.book.findUnique({ where: { id } });
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
