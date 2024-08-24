import { Link, useLocation } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { GridView as HomeIcon, Storefront as StoreIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import BookWorldIcon from '../../assets/book-world-icon.png';

function Sidebar() {
  const location = useLocation();
  const path = location.pathname;
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: 250,
        bgcolor: '#fff',
        borderRight: '1px solid #ddd',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <img src={BookWorldIcon} alt="Book World" style={{ width: 40, height: 40, marginRight: 10 }} />
        <Typography variant="h6"><b>Book</b> World</Typography>
      </Box>
      <List>
        <ListItem
          button
          component={Link}
          to="/"
          selected={path === '/'}
          sx={{
            ...(path === '/' && {
              borderLeft: `4px solid ${theme.palette.primary.main}`,
              bgcolor: theme.palette.action.selected,
              color: theme.palette.primary.main,
              '& .MuiListItemIcon-root': {
                color: theme.palette.primary.main,
              },
            }),
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Shop" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/stores"
          selected={path === '/stores'}
          sx={{
            ...(path === '/stores' && {
              borderLeft: `4px solid ${theme.palette.primary.main}`,
              bgcolor: theme.palette.action.selected,
              color: theme.palette.primary.main,
              '& .MuiListItemIcon-root': {
                color: theme.palette.primary.main,
              },
            }),
          }}
        >
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText primary="Stores" />
        </ListItem>
      </List>
    </Box>
  );
}

export default Sidebar;
