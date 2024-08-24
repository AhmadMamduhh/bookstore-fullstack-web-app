import { Router } from 'express';
import {
  getBooksInStore,
  addBookToStore,
  updateBookInStore,
  removeBookFromStore,
  sellBookInStore
} from '../controllers/storeBookController';

const router = Router();

router.get('/:storeId/books', getBooksInStore);
router.post('/:storeId/books', addBookToStore);
router.put('/:storeId/books/:bookId', updateBookInStore);
router.delete('/:storeId/books/:bookId', removeBookFromStore);
router.patch('/:storeId/books/:bookId/sell', sellBookInStore);

export default router;
