import { Request, Response } from 'express';
import authorService from '../services/authorService';
import { ErrorResponse } from '../types/error';

export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await authorService.getAllAuthors();
    res.json(authors);
  } catch (error) {
     const err: ErrorResponse = { error: (error as Error).message };
    res.status(500).json(err);
  }
};

export const getAuthorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const author = await authorService.getAuthorById(parseInt(id));
    if (author) {
      res.json(author);
    } else {
      res.status(404).json({ error: 'Author not found' });
    }
  } catch (error) {
     const err: ErrorResponse = { error: (error as Error).message };
    res.status(500).json(err);
  }
};

export const createAuthor = async (req: Request, res: Response) => {
  try {
    const newAuthor = await authorService.createAuthor(req.body);
    res.status(201).json(newAuthor);
  } catch (error) {
     const err: ErrorResponse = { error: (error as Error).message };
    res.status(500).json(err);
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedAuthor = await authorService.updateAuthor(parseInt(id), req.body);
    if (updatedAuthor) {
      res.json(updatedAuthor);
    } else {
      res.status(404).json({ error: 'Author not found' });
    }
  } catch (error) {
     const err: ErrorResponse = { error: (error as Error).message };
    res.status(500).json(err);
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await authorService.deleteAuthor(parseInt(id));
    if (result) {
      res.json({ message: 'Author deleted successfully' });
    } else {
      res.status(404).json({ error: 'Author not found' });
    }
  } catch (error) {
     const err: ErrorResponse = { error: (error as Error).message };
    res.status(500).json(err);
  }
};
