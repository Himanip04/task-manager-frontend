import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { apiRequest } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../src/redux/slices/authSlice';

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const handleLogin = async () => {
    try {
      const res = await apiRequest('/auth/signin', 'POST', {
        email,
        password,
      });

      dispatch(loginSuccess({ user: res.user, token: res.token }));

      navigate('/dashboard');
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
      <Paper sx={{ p: 4, width: 350 }}>
        <Typography variant='h5' mb={2}>
          Sign In
        </Typography>

        {err && <Typography color='error'>{err}</Typography>}

        <TextField
          label='Email'
          fullWidth
          margin='normal'
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label='Password'
          type='password'
          fullWidth
          margin='normal'
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant='contained' fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
          Login
        </Button>

        <Button variant='text' fullWidth sx={{ mt: 1 }} onClick={() => navigate('/signup')}>
          Create Account
        </Button>
      </Paper>
    </Box>
  );
}
