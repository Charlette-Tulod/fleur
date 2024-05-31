/* eslint-disable react/jsx-props-no-spreading */
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import supabase from '../../config/supabaseClient';
import useUserStore from '../../store/useUserStore';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone is required'),
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
});

type ProfileFormInputs = z.infer<typeof schema>;

function ProfilePage() {
  const { user, setUser } = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormInputs>({
    resolver: zodResolver(schema),
    defaultValues: user || {},
  });
  const navigate = useNavigate();

  const onUpdateProfile: SubmitHandler<ProfileFormInputs> = async (data) => {
    if (!user) return;

    const { data: updatedUserData, error } = await supabase
      .from('users')
      .update(data)
      .eq('id', user.id)
      .single();

    if (error) {
      console.error(error.message);
      return;
    }

    setUser(updatedUserData);
    // Optionally show a success message or navigate to another page
  };

  const onDeleteAccount = async () => {
    if (!user) return;

    const { error } = await supabase.from('users').delete().eq('id', user.id);

    if (error) {
      console.error(error.message);
      return;
    }

    // Perform any necessary cleanup or redirect to a different page
    setUser(null);
    navigate('/'); // Redirect to home page or login page
  };

  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error.message);
      return;
    }

    setUser(null);
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Profile
      </Typography>
      <form onSubmit={handleSubmit(onUpdateProfile)}>
        <TextField
          {...register('name')}
          label="Name"
          fullWidth
          margin="normal"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          {...register('phone')}
          label="Phone"
          fullWidth
          margin="normal"
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />
        <TextField
          {...register('username')}
          label="Username"
          fullWidth
          margin="normal"
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          {...register('email')}
          label="Email"
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update Profile
        </Button>
      </form>
      <Box mt={2}>
        <Button onClick={onDeleteAccount} variant="outlined" color="error">
          Delete Account
        </Button>
        <br />
        <Button onClick={onLogout}>Logout</Button>
      </Box>
    </Box>
  );
}

export default ProfilePage;
