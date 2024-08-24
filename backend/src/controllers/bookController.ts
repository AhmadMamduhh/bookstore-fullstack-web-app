import { Request, Response } from 'express';
import bookService from '../services/bookService';
import { ErrorResponse } from '../types/error';

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (error) {
     const err: ErrorResponse = { error: (error as Error).message };
    res.status(500).json(err);
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await bookService.getBookById(parseInt(id));
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
     const err: ErrorResponse = { error: (error as Error).message };
    res.status(500).json(err);
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const newBook = await bookService.createBook(req.body);
    res.status(201).json(newBook);
  } catch (error) {
     const err: ErrorResponse = { error: (error as Error).message };
    res.status(500).json(err);
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedBook = await bookService.updateBook(parseInt(id), req.body);
    if (updatedBook) {
      res.json(updatedBook);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
     const err: ErrorResponse = { error: (error as Error).message };
    res.status(500).json(err);
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await bookService.deleteBook(parseInt(id));
    if (result) {
      res.json({ message: 'Book deleted successfully' });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
     const err: ErrorResponse = { error: (error as Error).message };
    res.status(500).json(err);
  }
};
