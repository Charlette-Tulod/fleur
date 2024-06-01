import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton,
  Badge,
  Button,
  Typography,
} from '@mui/material';
import { ShoppingCart, AccountCircle } from '@mui/icons-material';
import { IoMdMenu } from 'react-icons/io';
import Logo from '../../assets/logo.png';
import useUserAuth from '../../hooks/userHooks/useUserAuth';
import useCartStore from '../../store/useCartStore';
import { fetchUserProfile } from '../../services/userSupabaseService';
import { User } from '../../models/user';

interface ActivationClassProps {
  isActive: boolean;
}

function NavigationBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, signOut } = useUserAuth();
  const cart = useCartStore((state) => state.cart);
  const [profile, setProfile] = useState<User | null>(null);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    if (user) {
      const fetchProfileData = async () => {
        const userData = await fetchUserProfile(user.id);
        setProfile(userData);
      };

      fetchProfileData();
    }
  }, [user]);

  const activationClass = ({ isActive }: ActivationClassProps): string =>
    isActive
      ? 'bg-lightrose hover:lightrose hover:text-white rounded-md px-5 py-2'
      : 'hover:lightrose hover:text-white rounded-md px-5 py-2';

  const renderCarts = () => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton component={Link} to="/cart" color="inherit" sx={{ mr: 4 }}>
        <Badge
          badgeContent={cart.reduce((acc, item) => acc + item.quantity, 0)}
          color="secondary"
        >
          <ShoppingCart />
        </Badge>
      </IconButton>

      {user ? (
        <Typography
          component={Link}
          to="/profile"
          variant="body1"
          sx={{ ml: 1, mr: 2, textDecoration: 'none', color: 'inherit' }}
        >
          {profile?.name}
        </Typography>
      ) : (
        <IconButton component={Link} to="/profile" color="inherit">
          <AccountCircle />
        </IconButton>
      )}
    </Box>
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
      <NavLink to="/contact" className={activationClass}>
        Contact Us
      </NavLink>
    </>
  );

  const renderRightNavLinks = () =>
    user ? (
      <Button
        sx={{
          borderRadius: 20,
          color: '#000000',
          boxShadow: 'none',
        }}
        onClick={signOut}
      >
        Logout
      </Button>
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
          />

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
