import { Request, Response } from 'express';
import storeBookService from '../services/storeBookService';
import { ErrorResponse } from '../types/error';

export const getBooksInStore = async (req: Request, res: Response) => {
    const { storeId } = req.params;
    try {
        const books = await storeBookService.getBooksInStore(parseInt(storeId));
        res.json(books);
    } catch (error) {
        const err: ErrorResponse = { error: (error as Error).message };
        res.status(500).json(err);
    }
};

export const addBookToStore = async (req: Request, res: Response) => {
    const { storeId } = req.params;
    try {
        const newAssociation = await storeBookService.addBookToStore(parseInt(storeId), req.body);
        res.status(201).json(newAssociation);
    } catch (error) {
        const err: ErrorResponse = { error: (error as Error).message };
        res.status(500).json(err);
    }
};

export const updateBookInStore = async (req: Request, res: Response) => {
    const { storeId, bookId } = req.params;
    try {
        const updatedAssociation = await storeBookService.updateBookInStore(parseInt(storeId), parseInt(bookId), req.body);
        if (updatedAssociation) {
            res.json(updatedAssociation);
        } else {
            res.status(404).json({ error: 'Association not found' });
        }
    } catch (error) {
        const err: ErrorResponse = { error: (error as Error).message };
        res.status(500).json(err);
    }
};

export const removeBookFromStore = async (req: Request, res: Response) => {
    const { storeId, bookId } = req.params;
    try {
        const result = await storeBookService.removeBookFromStore(parseInt(storeId), parseInt(bookId));
        if (result) {
            res.json({ message: 'Book removed from store successfully' });
        } else {
            res.status(404).json({ error: 'Association not found' });
        }
    } catch (error) {
        const err: ErrorResponse = { error: (error as Error).message };
        res.status(500).json(err);
    }
};

export const sellBookInStore = async (req: Request, res: Response) => {
    const { storeId, bookId } = req.params;

    try {
        await storeBookService.markBookAsSoldInStore(parseInt(storeId), parseInt(bookId));
        res.status(200).json({ message: 'Book marked as sold in the store' });
    } catch (error) {
        const err: ErrorResponse = { error: (error as Error).message };
        res.status(500).json(err);

    }
};
