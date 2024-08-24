import prisma from '../prismaClient';

const getAllAuthors = () => prisma.author.findMany();
const getAuthorById = (id: number) => prisma.author.findUnique({ where: { id } });
const createAuthor = (data: { name: string }) => prisma.author.create({ data });
const updateAuthor = (id: number, data: { name?: string }) =>
  prisma.author.update({ where: { id }, data });
const deleteAuthor = (id: number) => prisma.author.delete({ where: { id } });

export default {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};
