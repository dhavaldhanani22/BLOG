import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import { Link, useLocation } from 'react-router-dom';
import Path from './Commen/Path';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CollectionsIcon from '@mui/icons-material/Collections';
import EmailIcon from '@mui/icons-material/Email';

const drawerWidth = 240;



export default function Layout({ component }) {

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  

  const drawer = (
    <div className='drawer'>
      <Toolbar />
      <Divider />
      <List>

        <ListItem disablePadding>
          <Link to={Path.Dashboard}>
            <ListItemButton selected={location.pathname === Path.Dashboard}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding>
        <Link to={Path.Category}>
          <ListItemButton selected={location.pathname === Path.Category}>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary={"Category"} />
          </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding>
        <Link to={Path.Product}>
          <ListItemButton selected={location.pathname === Path.Product}>
            <ListItemIcon>
              <ProductionQuantityLimitsIcon />
            </ListItemIcon>
            <ListItemText primary={"Product"} />
          </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
        <Link to={Path.Gallery}>
          <ListItemButton selected={location.pathname === Path.Gallery}>
            <ListItemIcon>
              <CollectionsIcon />
            </ListItemIcon>
            <ListItemText primary={"Gallery"} />
          </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding>
        <Link to={Path.Post}>
          <ListItemButton selected={location.pathname === Path.Post}>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary={"Post"} />
          </ListItemButton>
          </Link>
        </ListItem>

      </List>

    </div>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        
        sx={{
          width: { sm: `100%` },
          ml: { sm: `${drawerWidth}px` },
          zIndex: 15000
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Blog Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {
          component
        }
      </Box>
    </Box>
  );
}