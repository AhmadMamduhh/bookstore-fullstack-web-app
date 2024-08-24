import React, { useState } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, FormControl, MenuItem, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStores, useDeleteStore } from '../data-hooks/useStores';
import PageHeader from '../components/layout/PageHeader';
import SearchField from '../components/shared/SearchField';
import AddStoreModal from '../components/stores/AddStoreModal';
import EditStoreModal from '../components/stores/EditStoreModal';
import ConfirmDeleteDialog from '../components/stores/ConfirmDeleteDialog';
import { Store } from '../types/types';

const StoresPage: React.FC = () => {
  const { data: stores = [], isLoading, error } = useStores();
  const { mutate: deleteStore } = useDeleteStore();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value);
  const handleSortOrderChange = (event: SelectChangeEvent<"asc" | "desc">) => setSortOrder(event.target.value as 'asc' | 'desc');
  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);
  const handleOpenEditModal = (store: Store) => {
    setSelectedStore(store);
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleOpenDeleteDialog = (store: Store) => {
    setSelectedStore(store);
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);
  const handleConfirmDelete = () => {
    if (selectedStore) {
      deleteStore(selectedStore.id);
      handleCloseDeleteDialog();
    }
  };

  const filteredStores = stores
    .filter(store => store.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortOrder === 'asc' ? a.id - b.id : b.id - a.id);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading stores</Typography>;

  return (
    <Box>
      <PageHeader title="Stores" />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", marginTop: 2, marginBottom: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Typography variant="h6" fontWeight={600}>Stores List</Typography>
          <SearchField label={"Search By Store Name"} searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
          <FormControl size="small">
            <InputLabel>Sort Order</InputLabel>
            <Select value={sortOrder} onChange={handleSortOrderChange} label="Sort Order">
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box alignSelf={"flex-end"}>
          <Button variant="contained" color="primary" sx={{ marginLeft: 2 }} onClick={handleOpenAddModal}>
            <AddIcon /> Add New Store
          </Button>
        </Box>
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
                  <IconButton color="primary" onClick={() => handleOpenEditModal(store)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleOpenDeleteDialog(store)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddStoreModal open={openAddModal} onClose={handleCloseAddModal} />
      {selectedStore && <EditStoreModal open={openEditModal} onClose={handleCloseEditModal} store={selectedStore} />}
      <ConfirmDeleteDialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} onConfirm={handleConfirmDelete} />
    </Box>
  );
};

export default StoresPage;
