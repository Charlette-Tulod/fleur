/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import supabase from '../../config/supabaseClient';
import { useUserStore } from '../../store/useUserStore';
import { SignUpSchema, SignUpSchemaType } from '../../schema/index';

function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
  });
  const setUser = useUserStore((state) => state.setUser);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });

      if (signUpError) {
        throw signUpError;
      }

      if (signUpData.user) {
        const { user } = signUpData;
        setUser(user);

        const { error: profileError } = await supabase.from('profiles').insert([
          {
            id: user.id,
            email: data.email,
            name: data.name,
            phone: data.phone,
            address: data.address,
          },
        ]);

        if (profileError) {
          throw new Error(profileError.message);
        }

        setSuccessMessage(
          'Sign up successful! Please check your email to confirm your account.'
        );
      }
    } catch (error: any) {
      if (error.message.includes('Email rate limit exceeded')) {
        setErrorMessage('Too many requests. Please try again later.');
      } else {
        setErrorMessage(error.message);
      }
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 5,
        mb: 5,
        p: 3,
        boxShadow: 2,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        color="customColors.brown"
        gutterBottom
      >
        Sign Up
      </Typography>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Name"
          inputProps={{ ...register('name') }}
          fullWidth
          margin="normal"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Phone"
          inputProps={{ ...register('phone') }}
          fullWidth
          margin="normal"
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />
        <TextField
          label="Address"
          inputProps={{ ...register('address') }}
          fullWidth
          margin="normal"
          error={!!errors.address}
          helperText={errors.address?.message}
        />
        <TextField
          label="Email"
          inputProps={{ ...register('email') }}
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          inputProps={{ ...register('password') }}
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            mt: 3,
          }}
          fullWidth
        >
          Sign Up
        </Button>
      </form>
    </Box>
  );
}

export default SignUpPage;
