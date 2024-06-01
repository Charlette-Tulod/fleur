/* eslint-disable react/jsx-props-no-spreading */
// /* eslint-disable react/jsx-props-no-spreading */
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { TextField, Button, Box, Typography } from '@mui/material';

// const schema = z.object({
//   name: z.string().min(1, 'Name is required'),
//   phone: z.string().min(1, 'Phone is required'),
//   username: z.string().min(1, 'Username is required'),
//   email: z.string().email('Invalid email address').min(1, 'Email is required'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
// });

// type RegisterFormInputs = z.infer<typeof schema>;

// function RegisterPage() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<RegisterFormInputs>({
//     resolver: zodResolver(schema),
//   });

//   const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
//     console.log(data);
//   };

//   return (
//     <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Register
//       </Typography>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <TextField
//           {...register('name')}
//           label="Name"
//           fullWidth
//           margin="normal"
//           error={!!errors.name}
//           helperText={errors.name?.message}
//         />
//         <TextField
//           {...register('phone')}
//           label="Phone"
//           fullWidth
//           margin="normal"
//           error={!!errors.phone}
//           helperText={errors.phone?.message}
//         />
//         <TextField
//           {...register('username')}
//           label="Username"
//           fullWidth
//           margin="normal"
//           error={!!errors.username}
//           helperText={errors.username?.message}
//         />
//         <TextField
//           {...register('email')}
//           label="Email"
//           fullWidth
//           margin="normal"
//           error={!!errors.email}
//           helperText={errors.email?.message}
//         />
//         <TextField
//           {...register('password')}
//           label="Password"
//           type="password"
//           fullWidth
//           margin="normal"
//           error={!!errors.password}
//           helperText={errors.password?.message}
//         />
//         <Button type="submit" variant="contained" color="primary" fullWidth>
//           Register
//         </Button>
//       </form>
//     </Box>
//   );
// }

// export default RegisterPage;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import supabase from '../../config/supabaseClient';
import { useUserStore } from '../../store/useUserStore';
import { SignUpSchema, SignUpSchemaType } from '../../datas/index';

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
