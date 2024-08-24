import React, { useState } from 'react';
import { Box, Typography, Button, FormControl, TextField as MuiTextField, Modal, Paper } from '@mui/material';
import { useAddStore } from '../../data-hooks/useStores';

interface AddStoreModalProps {
    open: boolean;
    onClose: () => void;
}

const AddStoreModal: React.FC<AddStoreModalProps> = ({ open, onClose }) => {
    const [newStoreName, setNewStoreName] = useState<string>('');
    const [newStoreAddress, setNewStoreAddress] = useState<string>('');
    const { mutate: addStore } = useAddStore();

    const handleSubmit = () => {
        addStore({
            name: newStoreName, address: newStoreAddress,
        });
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ width: 400, padding: 3, margin: 'auto', marginTop: '10%' }} component={Paper}>
                <Typography variant="h6">Add New Store</Typography>
                <FormControl fullWidth sx={{ marginTop: 2 }}>
                    <MuiTextField label="Store Name" variant="outlined" value={newStoreName} onChange={(e) => setNewStoreName(e.target.value)} />
                </FormControl>
                <FormControl fullWidth sx={{ marginTop: 2 }}>
                    <MuiTextField label="Store Address" variant="outlined" value={newStoreAddress} onChange={(e) => setNewStoreAddress(e.target.value)} />
                </FormControl>
                <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="outlined" onClick={onClose}>Cancel</Button>
                    <Button variant="contained" color="primary" sx={{ marginLeft: 1 }} onClick={handleSubmit}>Submit</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddStoreModal;
