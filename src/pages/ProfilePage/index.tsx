import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Card,
  CardContent,
  CardActions,
  CardMedia,
} from '@mui/material';

import Image1 from '../../assets/image9.webp';

import {
  fetchUserProfile,
  updateProfile,
} from '../../services/userSupabaseService';
import { useUserStore } from '../../store/useUserStore';
import { User } from '../../models/user'; // Adjust the path based on your project structure

function ProfilePage() {
  const { user } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
    clearUser: state.clearUser,
  }));
  const [profile, setProfile] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (user) {
      // Fetch additional user info from Supabase
      const fetchProfileData = async () => {
        try {
          const userData = await fetchUserProfile(user.id);
          setProfile(userData);
        } catch (error) {
          setErrorMessage(
            error instanceof Error ? error.message : String(error)
          );
        }
      };

      fetchProfileData();
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!profile) return;

    try {
      await updateProfile(profile.id, {
        name: profile.name,
        phone: profile.phone,
        address: profile.address,
      });

      setSuccessMessage('Profile updated successfully!');
      setIsEditMode(false);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    }
  };

  if (!user) {
    return <Typography>You need to be logged in to view this page.</Typography>;
  }

  return (
    <Box
      sx={{
        maxWidth: 'md',
        mx: 'auto',
        mt: 5,
        mb: 5,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box />
      <Typography
        variant="h4"
        fontWeight="bold"
        color="customColors.brown"
        gutterBottom
      >
        Profile
      </Typography>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {!isEditMode ? (
        <Card
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            p: 2,
          }}
        >
          <CardMedia
            component="img"
            image={Image1}
            sx={{ height: '200px', objectFit: 'contain' }}
          />
          <CardContent sx={{ width: '100%' }}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Name: {profile?.name}
            </Typography>

            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Phone: {profile?.phone}
            </Typography>

            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Address: {profile?.address}
            </Typography>

            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Email: {user.email}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 2,
              }}
            >
              <CardActions>
                <Button
                  onClick={() => setIsEditMode(true)}
                  variant="contained"
                  size="small"
                >
                  Edit Profile
                </Button>
              </CardActions>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Box
          sx={{
            maxWidth: '400px',
          }}
        >
          <TextField
            label="Name"
            value={profile?.name || ''}
            onChange={(e) =>
              setProfile((prevProfile) => ({
                ...prevProfile!,
                name: e.target.value,
              }))
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            value={profile?.phone || ''}
            onChange={(e) =>
              setProfile((prevProfile) => ({
                ...prevProfile!,
                phone: e.target.value,
              }))
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            value={profile?.address || ''}
            onChange={(e) =>
              setProfile((prevProfile) => ({
                ...prevProfile!,
                address: e.target.value,
              }))
            }
            fullWidth
            margin="normal"
          />

          <Button
            onClick={handleUpdateProfile}
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            fullWidth
          >
            Update Profile
          </Button>
          <Button
            onClick={() => setIsEditMode(false)}
            variant="contained"
            color="secondary"
            sx={{ mt: 3 }}
            fullWidth
          >
            Cancel
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default ProfilePage;
