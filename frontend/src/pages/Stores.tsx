import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Modal, FormControl, InputLabel, TextField as MuiTextField, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useStores from '../data-hooks/useStores';
import PageHeader from '../components/layout/PageHeader';
import SearchField from '../components/shared/SearchField';

const StoresPage: React.FC = () => {
  const { data: stores = [], isLoading, error } = useStores();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newStoreName, setNewStoreName] = useState<string>('');
  const [newStoreAddress, setNewStoreAddress] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value);
  const handleSortOrderChange = (event: SelectChangeEvent<"asc" | "desc">) => setSortOrder(event.target.value as 'asc' | 'desc');
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleSubmitNewStore = () => {
    // Implement store creation logic
    handleCloseModal();
  };

  const filteredStores = stores
    .filter(store => store.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortOrder === 'asc' ? a.id - b.id : b.id - a.id);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading stores</Typography>;

  return (
    <Box>
      <PageHeader title="Stores" />
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2, marginBottom: 2 }}>
        <SearchField label={"Search By Store Name"} searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
        <FormControl size="small" sx={{ marginLeft: 2 }}>
          <InputLabel>Sort Order</InputLabel>
          <Select value={sortOrder} onChange={handleSortOrderChange} label="Sort Order">
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" sx={{ marginLeft: 2 }} onClick={handleOpenModal}>
          <AddIcon /> Add Store
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Store ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStores.map((store) => (
              <TableRow key={store.id}>
                <TableCell>{store.id}</TableCell>
                <TableCell>{store.name}</TableCell>
                <TableCell>{store.address}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ width: 400, padding: 3, margin: 'auto', marginTop: '10%' }} component={Paper}>
          <Typography variant="h6">Add New Store</Typography>
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <MuiTextField label="Store Name" variant="outlined" value={newStoreName} onChange={(e) => setNewStoreName(e.target.value)} />
          </FormControl>
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <MuiTextField label="Store Address" variant="outlined" value={newStoreAddress} onChange={(e) => setNewStoreAddress(e.target.value)} />
          </FormControl>
          <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={handleCloseModal}>Cancel</Button>
            <Button variant="contained" color="primary" sx={{ marginLeft: 1 }} onClick={handleSubmitNewStore}>Submit</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default StoresPage;
