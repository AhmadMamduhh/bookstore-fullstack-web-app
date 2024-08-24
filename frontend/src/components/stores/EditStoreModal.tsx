import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, FormControl, TextField as MuiTextField, Modal, Paper } from '@mui/material';
import { useUpdateStore } from '../../data-hooks/useStores';
import { Store } from '../../types/types';

interface EditStoreModalProps {
  open: boolean;
  onClose: () => void;
  store: Store | null;
}

const EditStoreModal: React.FC<EditStoreModalProps> = ({ open, onClose, store }) => {
  const [storeName, setStoreName] = useState<string>('');
  const [storeAddress, setStoreAddress] = useState<string>('');
  const { mutate: updateStore } = useUpdateStore();

  useEffect(() => {
    if (store) {
      setStoreName(store.name);
      setStoreAddress(store.address);
    }
  }, [store]);

  const handleSubmit = () => {
    if (store) {
      updateStore({ ...store, name: storeName, address: storeAddress });
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: 400, padding: 3, margin: 'auto', marginTop: '10%' }} component={Paper}>
        <Typography variant="h6">Edit Store</Typography>
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <MuiTextField label="Store Name" variant="outlined" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
        </FormControl>
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <MuiTextField label="Store Address" variant="outlined" value={storeAddress} onChange={(e) => setStoreAddress(e.target.value)} />
        </FormControl>
        <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={onClose}>Cancel</Button>
          <Button variant="contained" color="primary" sx={{ marginLeft: 1 }} onClick={handleSubmit}>Submit</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditStoreModal;
