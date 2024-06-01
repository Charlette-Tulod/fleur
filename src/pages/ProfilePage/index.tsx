// import { useState, useEffect } from 'react';
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Alert,
//   Card,
//   CardContent,
//   CardActions,
//   IconButton,
// } from '@mui/material';
// import { Edit as EditIcon } from '@mui/icons-material';

// import supabase from '../../config/supabaseClient';
// import { useUserStore } from '../../store/useUserStore';

// function ProfilePage() {
//   const { user } = useUserStore((state) => ({
//     user: state.user,
//     setUser: state.setUser,
//     clearUser: state.clearUser,
//   }));
//   // Initialize useNavigate hook
//   const [profile, setProfile] = useState<{
//     name: string;
//     phone: string;
//   } | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [isEditMode, setIsEditMode] = useState(false);

//   useEffect(() => {
//     if (user) {
//       // Fetch additional user info from Supabase
//       const fetchProfile = async () => {
//         const { data, error } = await supabase
//           .from('profiles')
//           .select('name, phone')
//           .eq('id', user.id)
//           .single();

//         if (data) {
//           setProfile({ name: data.name, phone: data.phone });
//         }

//         if (error) {
//           // console.error('Fetch Profile Error:', error);
//           setErrorMessage(
//             error instanceof Error ? error.message : String(error)
//           );
//         }
//       };

//       fetchProfile();
//     }
//   }, [user]);

//   const updateProfile = async () => {
//     setErrorMessage(null);
//     setSuccessMessage(null);

//     try {
//       const formData = {
//         name: profile?.name || '',
//         phone: profile?.phone || '',
//       };

//       const { error } = await supabase
//         .from('profiles')
//         .update(formData)
//         .eq('id', user?.id);

//       if (error) {
//         throw new Error(error.message as string); // Explicitly cast error.message to string
//       } else {
//         setSuccessMessage('Profile updated successfully!');
//         setIsEditMode(false);
//       }
//     } catch (error) {
//       // console.error('Error updating profile:', error);
//       setErrorMessage(error instanceof Error ? error.message : String(error));
//     }
//   };

//   if (!user) {
//     return <Typography>You need to be logged in to view this page.</Typography>;
//   }

//   return (
//     <Box
//       sx={{
//         maxWidth: 400,
//         mx: 'auto',
//         mt: 5,
//         p: 3,
//         boxShadow: 2,
//         borderRadius: 2,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//       }}
//     >
//       <Typography
//         variant="h4"
//         fontWeight="bold"
//         color="customColors.brown"
//         gutterBottom
//       >
//         Profile
//       </Typography>
//       {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
//       {successMessage && <Alert severity="success">{successMessage}</Alert>}
//       {!isEditMode ? (
//         <Card>
//           <CardContent>
//             <Typography variant="h6">Name: {profile?.name}</Typography>
//             <Typography variant="h6">Phone: {profile?.phone}</Typography>
//             <Typography variant="h6">Email: {user.email}</Typography>
//           </CardContent>
//           <CardActions>
//             <IconButton onClick={() => setIsEditMode(true)}>
//               <EditIcon />
//             </IconButton>
//           </CardActions>
//         </Card>
//       ) : (
//         <Box>
//           <TextField
//             label="Name"
//             value={profile?.name || ''}
//             onChange={(e) =>
//               setProfile((prev) => ({
//                 ...prev!,
//                 name: e.target.value,
//               }))
//             }
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Phone"
//             value={profile?.phone || ''}
//             onChange={(e) =>
//               setProfile((prev) => ({
//                 ...prev!,
//                 phone: e.target.value,
//               }))
//             }
//             fullWidth
//             margin="normal"
//           />

//           <Button
//             onClick={updateProfile}
//             variant="contained"
//             color="primary"
//             sx={{ mt: 3 }}
//             fullWidth
//           >
//             Update Profile
//           </Button>
//           <Button
//             onClick={() => setIsEditMode(false)}
//             variant="contained"
//             color="secondary"
//             sx={{ mt: 3 }}
//             fullWidth
//           >
//             Cancel
//           </Button>
//         </Box>
//       )}
//     </Box>
//   );
// }

// export default ProfilePage;

import React, { useState, useEffect } from 'react';
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
import { User } from '../../datas/user'; // Adjust the path based on your project structure

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
