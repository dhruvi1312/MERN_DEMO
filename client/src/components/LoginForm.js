import React, { useState } from 'react'
import { Box, Card, Grid, TextField, Typography, Button } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { signIn } from '../actions/index';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleLogin = () => {
    dispatch(signIn(formData, navigate))
    navigate('/student-list')
  }
  return (
    <Box className='login-box'>
      <Grid container justifyContent='center' rowSpacing={2}>
        <Grid item xs={12} sm={8} md={6} lg={4} >
          <Card sx={{ p: 4, m: 3 }}>
            <Typography variant="h2" component="h2" className='title'>
              Login
            </Typography>
            <TextField sx={{ mt: 2 }} label="Email" variant="outlined" fullWidth name='email' onChange={handleChange}/>
            <TextField sx={{ mt: 2 }} label="Password" variant="outlined" fullWidth name='password' onChange={handleChange}/>
            <Button sx={{ mt: 2 }} variant="contained" fullWidth color="secondary" onClick={handleLogin}>Login</Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default LoginForm
