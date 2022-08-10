import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

export const Login = () => {

  let navigate = useNavigate();

  const onChangeInputFormData = (event) => {
    const { name, value } = event.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);
  };

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/user/sign_in', formData)
      const { data } = response || {};
      const { token, user } = data || {};
      if (!token || !user) {
        throw new Error('Invalid credentials');
      }
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate("/users", { replace: true });
    } catch (error) {
      const message = error.response.data.message || error.message;
      alert(`Error: ${message}`);
    }

  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      position={'absolute'}
      top={'50%'}
      left={'50%'}
      style={{ transform: 'translate(-50%, -50%)' }}
      onSubmit={handleSubmit}
    >
      <Grid container spacing={2} display={'flex'} flexDirection={'column'} justifyContent={'center'} width="25ch">
        <Grid item xs={12}>
          <Typography variant="h4">Administración</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="username"
            label="Usuario"
            onChange={onChangeInputFormData}
            value={formData.username}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            name="password"
            label="Contraseña"
            type="password"
            onChange={onChangeInputFormData}
            value={formData.password}
          />
        </Grid>

        <Grid item xs={12}>
          <Button fullWidth type="submit" variant="contained">Iniciar Sesion</Button>
        </Grid>
      </Grid >

    </Box >
  );
}
