import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

interface PageHeaderProps {
    title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
    return (
        <Box>
            <Typography variant="h5">{title}</Typography>
            <Divider sx={{ my: 3 }} />
        </Box>
    );
};

export default PageHeader;
