import React, { useState } from 'react';
import { Box, Typography, Grid, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import useBooks from '../data-hooks/useBooks';
import { Book } from '../types/types';
import PageHeader from '../components/layout/PageHeader';
import SearchField from '../components/shared/SearchField';
import BookCard from '../components/books/BookCard';

const ShopPage: React.FC = () => {
  const { data: books = [], isLoading, error } = useBooks();
  const [authorFilter, setAuthorFilter] = useState<string>('');
  const [storeFilter, setStoreFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('price');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleAuthorFilterChange = (event: SelectChangeEvent<string>) => setAuthorFilter(event.target.value);
  const handleStoreFilterChange = (event: SelectChangeEvent<string>) => setStoreFilter(event.target.value);
  const handleSortByChange = (event: SelectChangeEvent<string>) => setSortBy(event.target.value as string);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value);

  const filteredBooks = books
    .filter((book: Book) => !authorFilter || book.author.name.includes(authorFilter))
    .filter((book: Book) => !storeFilter || book.stores.some(storeBook => storeBook.store.name.includes(storeFilter)))
    .filter((book: Book) => !searchTerm || book.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortBy === 'price'
      ? a.stores[0]?.price - b.stores[0]?.price
      : a.name.localeCompare(b.name)
    );

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading books</Typography>;

  return (
    <Box width="100%">
      <PageHeader title="Shop" />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
        <Typography variant="h6" fontWeight={600}>Browse Books</Typography>
        <SearchField searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      </Box>
      <Box sx={{ marginTop: 2.5, display: 'flex', gap: 2, width: "100%" }}>
        <FormControl size="small" fullWidth>
          <InputLabel>Filter by Author</InputLabel>
          <Select value={authorFilter} onChange={handleAuthorFilterChange} label="Filter by Author">
            <MenuItem value="">All</MenuItem>
            {/* Add author options dynamically */}
          </Select>
        </FormControl>
        <FormControl size="small" fullWidth>
          <InputLabel>Filter by Store</InputLabel>
          <Select value={storeFilter} onChange={handleStoreFilterChange} label="Filter by Store">
            <MenuItem value="">All</MenuItem>
            {/* Add store options dynamically */}
          </Select>
        </FormControl>
        <FormControl size="small" fullWidth>
          <InputLabel>Sort by</InputLabel>
          <Select value={sortBy} onChange={handleSortByChange} label="Sort by">
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="title">Title</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {filteredBooks.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ShopPage;
