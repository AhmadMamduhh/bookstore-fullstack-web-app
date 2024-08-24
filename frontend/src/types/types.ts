// src/types.ts

export interface Store {
    id: number;
    name: string;
    address: string;
    books: StoreBook[];
  }
  
  export interface Book {
    id: number;
    name: string;
    pages: number;
    author: Author;
    stores: StoreBook[];
  }
  
  export interface Author {
    id: number;
    name: string;
    books: Book[];
  }
  
  export interface StoreBook {
    store: Store;
    storeId: number;
    book: Book;
    bookId: number;
    price: number;
    soldOut: boolean;
  }
  