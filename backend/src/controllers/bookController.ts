import { Request, Response } from 'express';
import bookService from '../services/bookService';
import { ErrorResponse } from '../types/error';


export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await bookService.getAllBooks();
    // Format the data
    const formattedBooks = books.map(book => ({
      id: book.id,
      name: book.name,
      pages: book.pages,
      author: {
        id: book.author.id,
        name: book.author.name
      },
      stores: book.stores.map(storeBook => ({
        store: {
          id: storeBook.store.id,
          name: storeBook.store.name,
          address: storeBook.store.address,
        },
        storeId: storeBook.storeId,
        bookId: storeBook.bookId,
        price: storeBook.price,
        soldOut: storeBook.soldOut,
      }))
    }));
    res.json(formattedBooks);
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
      // Format the data
      const formattedBook = {
        id: book.id,
        name: book.name,
        pages: book.pages,
        author: {
          id: book.author.id,
          name: book.author.name,
        },
        stores: book.stores.map(storeBook => ({
          store: {
            id: storeBook.store.id,
            name: storeBook.store.name,
            address: storeBook.store.address,
          },
          storeId: storeBook.storeId,
          bookId: storeBook.bookId,
          price: storeBook.price,
          soldOut: storeBook.soldOut,
        }))
      };
      res.json(formattedBook);
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
