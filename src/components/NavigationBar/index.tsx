import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  InputBase,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton,
  Badge,
  Button,
} from '@mui/material';
import {
  ShoppingCart,
  AccountCircle,
  Search,
  FavoriteBorder,
} from '@mui/icons-material';
import { IoMdMenu } from 'react-icons/io';
import Logo from '../../assets/logo.png';
import useUserAuth from '../../hooks/userHooks/useUserAuth';
import useCartStore from '../../store/useCartStore';

interface ActivationClassProps {
  isActive: boolean;
}
function NavigationBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, signOut } = useUserAuth();
  const cart = useCartStore((state) => state.cart);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const activationClass = ({ isActive }: ActivationClassProps): string =>
    isActive
      ? 'bg-lightrose hover:lightrose hover:text-white rounded-md px-5 py-2'
      : 'hover:lightrose hover:text-white rounded-md px-5 py-2';

  const renderCarts = () => (
    <>
      <IconButton color="inherit">
        <Badge
          badgeContent={cart.reduce((acc, item) => acc + item.quantity, 0)}
          color="secondary"
        >
          <ShoppingCart />
        </Badge>
      </IconButton>
      <IconButton color="inherit">
        <FavoriteBorder />
      </IconButton>
      <IconButton color="inherit">
        <AccountCircle />
      </IconButton>
    </>
  );

  const renderLeftNavLinks = () => (
    <>
      <NavLink to="/" className={activationClass}>
        Home
      </NavLink>
      <NavLink to="/flowers" className={activationClass}>
        Shop
      </NavLink>
      <NavLink to="/about" className={activationClass}>
        About Us
      </NavLink>
      <NavLink to="/fAQ" className={activationClass}>
        FAQ
      </NavLink>
      <NavLink to="/contact" className={activationClass}>
        Contact Us
      </NavLink>
    </>
  );

  const renderRightNavLinks = () =>
    user ? (
      <Button onClick={signOut}>Logout</Button>
    ) : (
      <>
        <NavLink to="/login" className={activationClass}>
          Login
        </NavLink>
        <NavLink to="/register" className={activationClass}>
          Register
        </NavLink>
      </>
    );

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{ backgroundColor: '#fff1f2', borderBottom: '1px solid #ffe4e6' }}
      >
        <Toolbar>
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <img
              src={Logo}
              alt="Fleur"
              style={{ height: '90px', marginRight: '16px' }}
            />
          </NavLink>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              position: 'relative',
              borderRadius: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.25)' },
              marginRight: 2,
              marginLeft: 0,
              width: 'auto',
            }}
          >
            <Box
              sx={{
                padding: '0 16px',
                height: '100%',
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Search />
            </Box>
            <InputBase
              placeholder="Search for Items"
              inputProps={{ 'aria-label': 'search' }}
              sx={{
                color: 'inherit',
                paddingLeft: `calc(1em + 32px)`,
                width: '100%',
              }}
            />
          </Box>

          <Box sx={{ marginLeft: 'auto', display: { xs: 'none', md: 'flex' } }}>
            <div style={{ flexGrow: 1 }} />
            {renderCarts()}
          </Box>

          {isMobile && (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ ml: 'auto' }}
                onClick={handleDrawerToggle}
              >
                <IoMdMenu />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerToggle}
              >
                <Box
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  <div style={{ flexGrow: 1 }} />
                  {renderCarts()}
                  {renderLeftNavLinks()}
                  {renderRightNavLinks()}
                </Box>
              </Drawer>
            </>
          )}
        </Toolbar>
      </AppBar>

      {!isMobile && (
        <AppBar
          position="static"
          elevation={0}
          sx={{ backgroundColor: '#ffffff', borderBottom: '1px solid #ffe4e6' }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex' }}>{renderLeftNavLinks()}</Box>
            <Box sx={{ display: 'flex' }}>{renderRightNavLinks()}</Box>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
}

export default NavigationBar;
