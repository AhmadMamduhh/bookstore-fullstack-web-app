import { Request, Response } from 'express';
import storeService from '../services/storeService';
import { ErrorResponse } from '../types/error';

export const getAllStores = async (req: Request, res: Response) => {
  try {
    const stores = await storeService.getAllStores();
    res.json(stores);
  } catch (error) {
     const err: ErrorResponse = { error: (error as Error).message };
    res.status(500).json(err);
  }
};

export const getStoreById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const store = await storeService.getStoreById(parseInt(id));
    if (store) {
      res.json(store);
    } else {
      res.status(404).json({ error: 'Store not found' });
    }
  } catch (error) {
     const err: ErrorResponse = { error: (error as Error).message };
    res.status(500).json(err);
  }
};

export const createStore = async (req: Request, res: Response) => {
  try {
    const newStore = await storeService.createStore(req.body);
    res.status(201).json(newStore);
  } catch (error) {
     const err: ErrorResponse = { error: (error as Error).message };
    res.status(500).json(err);
  }
};

export const updateStore = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedStore = await storeService.updateStore(parseInt(id), req.body);
    if (updatedStore) {
      res.json(updatedStore);
    } else {
      res.status(404).json({ error: 'Store not found' });
    }
  } catch (error) {
     const err: ErrorResponse = { error: (error as Error).message };
    res.status(500).json(err);
  }
};

export const deleteStore = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await storeService.deleteStore(parseInt(id));
    if (result) {
      res.json({ message: 'Store deleted successfully' });
    } else {
      res.status(404).json({ error: 'Store not found' });
    }
  } catch (error) {
     const err: ErrorResponse = { error: (error as Error).message };
    res.status(500).json(err);
  }
};
