import express from 'express';
import bodyParser from 'body-parser';
import bookRoutes from './routes/bookRoutes';
import authorRoutes from './routes/authorRoutes';
import storeRoutes from './routes/storeRoutes';
import storeBookRoutes from './routes/storeBookRoutes';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/stores', storeBookRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
