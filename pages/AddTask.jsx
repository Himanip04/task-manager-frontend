import { useEffect, useState } from 'react';
import { apiRequest } from '../services/api';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addTask, updateTask } from '../src/redux/slices/taskSlice';

// Material UI
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Alert,
} from '@mui/material';

export default function AddTask() {
  const { id } = useParams();               
  const isEdit = Boolean(id);               

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'todo',
  });

  const [error, setError] = useState('');

  // Load task data in edit mode
  const loadTask = async () => {
    try {
      const res = await apiRequest(`/tasks/${id}`, 'GET');
      setTask(res); 
    } catch (err) {
      setError('Failed to load task');
    }
  };

  useEffect(() => {
    if (isEdit) loadTask();
  }, []);

  // Handle Add & Update
  const handleSubmit = async () => {
   if (!task.title.trim() || !task.description.trim()) {
      setError('All fields are required!');
      return;
    }


    try {
      if (isEdit) {
        // UPDATE
        const res = await apiRequest(`/tasks/${id}`, 'PUT', task);
        dispatch(updateTask(res));
      } else {
        // ADD
        const res = await apiRequest('/tasks', 'POST', task);
        dispatch(addTask(res));
      }

      navigate('/dashboard');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Box
      sx={{
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f7f7f7',
      }}
    >
      <Card sx={{ width: '420px', padding: '20px', borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography
            variant='h5'
            fontWeight='bold'
            align='center'
            sx={{ mb: 3 }}
          >
            {isEdit ? 'Edit Task' : 'Add New Task'}
          </Typography>

           {error && <Typography color='error'>{error}</Typography>}
         

          {/* Title */}
          <TextField
            fullWidth
            label='Task Title'
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            sx={{ mb: 2 }}
          />

          {/* Description */}
          <TextField
            fullWidth
            label='Description'
            multiline
            rows={3}
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            sx={{ mb: 2 }}
          />

          {/* Status */}
          <TextField
            fullWidth
            select
            label='Status'
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
            sx={{ mb: 3 }}
          >
            <MenuItem value='todo'>To Do</MenuItem>
            <MenuItem value='Pending'>Pending</MenuItem>
            <MenuItem value='Completed'>Completed</MenuItem>
          </TextField>

          <Button
            variant='contained'
            fullWidth
            sx={{
              padding: '10px',
              fontSize: '16px',
            }}
            onClick={handleSubmit}
          >
            {isEdit ? 'Update Task' : 'Add Task'}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
