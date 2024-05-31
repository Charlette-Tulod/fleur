import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import supabase from '../../config/supabaseClient';
import { useUserStore } from '../../store/useUserStore';
import useCartStore from '../../store/useCartStore';
import { LoginSchema, LoginSchemaType } from '../../datas/index';

function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });
  const setUser = useUserStore((state) => state.setUser);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    setErrorMessage(null);

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw error;
      }

      if (user) {
        setUser(user);
        fetchCart(user.id);
        navigate('/');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.message.includes('Invalid login credentials')) {
        setErrorMessage('Invalid email or password. Please try again.');
      } else {
        setErrorMessage(error.message);
      }
      console.error(error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('email')}
          label="Email"
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('password')}
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </Box>
  );
}

export default LoginPage;
