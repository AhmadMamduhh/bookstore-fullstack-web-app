import prisma from '../prismaClient';

const getAllStores = () => prisma.store.findMany();
const getStoreById = (id: number) => prisma.store.findUnique({ where: { id } });
const createStore = (data: { name: string; address: string }) => prisma.store.create({ data });
const updateStore = (id: number, data: { name?: string; address?: string }) =>
  prisma.store.update({ where: { id }, data });
const deleteStore = (id: number) => prisma.store.delete({ where: { id } });

export default {
  getAllStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore
};
