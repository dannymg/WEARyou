import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance";

export const LoginFormDialog = ({ open, onClose }) => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const defaultFormData = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(defaultFormData);

  const onChangeInputFormData = (event) => {
    const { name, value } = event.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);
  };

  const handleOnClose = (ev) => {
    setFormData(defaultFormData);
    onClose && onClose(ev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("/user/sign_in", formData);
      const { data } = response || {};
      const { token, user } = data || {};
      if (!token || !user) {
        throw new Error("Invalid credentials");
      }
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/", { replace: true });
      alert("Ingreso correcto");
      handleOnClose(e);
    } catch (error) {
      const message = error.response.data.message || error.message;
      alert(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleOnClose} fullWidth="sm">
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <DialogTitle>Iniciar Sesion </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Nombre de usuario"
            name="username"
            variant="standard"
            fullWidth
            onChange={onChangeInputFormData}
            value={formData.username}
            required
          />

          <TextField
            label="Contraseña"
            name="password"
            variant="standard"
            fullWidth
            onChange={onChangeInputFormData}
            value={formData.password}
            type="password"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOnClose} variant="contained" type="button">
            Cancelar
          </Button>
          <Button variant="contained" type="submit" loading={loading}>
            Ingresar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
