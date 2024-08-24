import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';

const prisma = new PrismaClient();

interface SeedRow {
  book_name: string;
  book_pages: number;
  author: string;
  store_name: string;
  store_address: string;
  store_price_for_book: number;
}

const parseCSV = (filePath: string): Promise<SeedRow[]> => {
  return new Promise((resolve, reject) => {
    const results: SeedRow[] = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        results.push({
          book_name: row['book_name'],
          book_pages: parseInt(row['book_pages']),
          author: row['author'],
          store_name: row['store_name'],
          store_address: row['store_address'],
          store_price_for_book: parseFloat(row['store_price_for_book']),
        });
      })
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

const seedDatabase = async () => {
  try {
    const seedRows = await parseCSV(path.resolve(__dirname, '../src/data/bookstore-seeds.csv'));

    for (const row of seedRows) {
 
      const author = await prisma.author.upsert({
        where: { name: row.author },
        update: {},
        create: { name: row.author },
      });


      const book = await prisma.book.upsert({
        where: { name: row.book_name },
        update: {},
        create: {
          name: row.book_name,
          pages: row.book_pages,
          authorId: author.id,
        },
      });

      
      const store = await prisma.store.upsert({
        where: { name: row.store_name },
        update: {},
        create: {
          name: row.store_name,
          address: row.store_address,
        },
      });

    
      await prisma.storeBook.upsert({
        where: {
          storeId_bookId: {
            storeId: store.id,
            bookId: book.id,
          },
        },
        update: {
          price: row.store_price_for_book,
        },
        create: {
          storeId: store.id,
          bookId: book.id,
          price: row.store_price_for_book,
          soldOut: false,
        },
      });
    }

    console.log('Seeding completed!');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seedDatabase();
