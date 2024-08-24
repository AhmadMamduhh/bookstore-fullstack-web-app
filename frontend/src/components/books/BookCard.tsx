import React from 'react';
import { Card, Typography, Button, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Book } from '../../types/types';
import { useSellBook } from '../../data-hooks/useBooks'; // Update path as needed

interface BookCardProps {
    book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
    const { mutate: sellBook} = useSellBook(); // Destructure mutation function and loading state

    const handleSellBook = (storeId: number, bookId: number) => {
        sellBook({ storeId, bookId });
    };

    return (
        <Card sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            height: '100%',
            border: '1px solid #E0E0E0',
            borderRadius: '8px'
        }}>
            <Box sx={{
                backgroundColor: '#FFEBE1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: "30%",
                height: "80%",
                margin: 'auto',
                ml: 2,
                borderRadius: 4
            }}>
                <Typography textAlign={"center"} fontSize={"0.85rem"}>{book.name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', p: 2, flex: '1 1 auto' }}>
                <Typography variant="h6" component="div">
                    {book.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    by {book.author.name}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                    Stores:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                    {book.stores.map(storeBook => (
                        <Box key={storeBook.storeId} sx={{
                            p: 1,
                            border: '1px solid #F0F0F0',
                            borderRadius: '8px',
                            flexGrow: 1,
                            backgroundColor: '#FFF6F1',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Typography variant="body2" sx={{ mb: 1, textAlign: 'center' }}>
                                {storeBook.store.name}
                            </Typography>
                            <Typography variant="body2" fontWeight="bold" sx={{ mb: 1, textAlign: 'center', color: '#FF8C00' }}>
                                ${storeBook.price}
                            </Typography>
                            {storeBook.soldOut ? (
                                <Typography variant="body2" color="text.secondary">Sold</Typography>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    endIcon={<ShoppingCartIcon />}
                                    onClick={() => handleSellBook(storeBook.storeId, book.id)}
                                >
                                    Sell
                                </Button>
                            )}
                        </Box>
                    ))}
                </Box>
            </Box>
        </Card>
    );
};

export default BookCard;
