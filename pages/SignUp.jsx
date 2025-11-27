import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Box, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { apiRequest } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { signupSuccess } from '../src/redux/slices/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [err, setErr] = useState('');

  const handleSignUp = async () => {
      if (!email.trim() || !password.trim() || !name.trim() || !role.trim()) {
      setErr("All fields are required!");
      return;
    }
    try {
      const res = await apiRequest('/auth/signup', 'POST', {
         name,
        email,
        password,
        role
      });


      dispatch(signupSuccess({ user: res.user }));

      toast.success('Account successfully created! Please login.'); 
      setTimeout(() => {
        navigate('/');
      }, 2000); 
    } catch (error) {
      setErr(error.message);
      toast.error(error.message); 
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
      <Paper sx={{ p: 4, width: 350 }}>
        <Typography variant='h5' mb={2}>
          Sign Up
        </Typography>

        {err && <Typography color='error'>{err}</Typography>}

        <TextField
          label='Name'
          fullWidth
          margin='normal'
          onChange={(e) => setName(e.target.value)}
        />
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

        <FormControl fullWidth margin='normal'>
          <InputLabel id='user-label'>User</InputLabel>
          <Select
            labelId='user-label'
            value={role}
            label='User'
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value='admin'>Admin</MenuItem>
            <MenuItem value='user'>User</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant='contained'
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
      </Paper>

      {/* Toast container to display notifications */}
      <ToastContainer position='top-right' autoClose={3000} />
    </Box>
  );
}

