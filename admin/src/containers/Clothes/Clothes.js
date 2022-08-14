import { Layout } from "../../components/Layout";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { DataGrid } from "@mui/x-data-grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteSharp from "@mui/icons-material/DeleteSharp";
import ModeEdit from "@mui/icons-material/ModeEdit";

export const Clothes = () => {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const defaultFormData = {
    code: "",
    brand: "",
    color: "",
    size: "",
    price: 0,
    clothe_type: "",
  };
  const [formData, setFormData] = useState(defaultFormData);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData(defaultFormData);
  };

  const columns = [
    { field: "code", headerName: "Codigo", flex: 1 },
    { field: "brand", headerName: "Marca", flex: 1 },
    { field: "color", headerName: "Color", flex: 1 },
    { field: "size", headerName: "Talla", flex: 1 },
    { field: "price", headerName: "Precio", flex: 1 },
    { field: "clothe_type", headerName: "Tipo de ropa", flex: 1 },
    // {
    //   field: "actions",
    //   headerName: "Acciones",
    //   flex: 1,
    //   renderCell: () => {
    //     return (
    //       <Box display="flex" justifyContent="center" alignItems="center">
    //         <IconButton aria-label="delete" size="small">
    //           <ModeEdit fontSize="inherit" />
    //         </IconButton>
    //         <IconButton aria-label="delete" size="small">
    //           <DeleteSharp fontSize="inherit" />
    //         </IconButton>
    //       </Box>
    //     );
    //   },
    // },
  ];

  const fetchClothes = async () => {
    const response = await axiosInstance.get("/clothe");
    const { data } = response || {};
    const clothesWithId = (data || []).map((item, index) => {
      item.id = index;
      return item;
    });

    setClothes(clothesWithId);
  };

  useEffect(() => {
    setLoading(true);
    try {
      fetchClothes();
    } catch (error) {
      const message = error.response.data.message || error.message;
      alert(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const onChangeInputFormData = (event) => {
    const { name, value } = event.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post("/clothe", formData);
      await fetchClothes();
      setFormData(defaultFormData);
      setOpenDialog(false);
    } catch (error) {
      const message = error.response.data.message || error.message;
      alert(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4">Prendas de Vestir</Typography>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Crear nueva prenda" arrow>
            <IconButton
              aria-label="add"
              size="large"
              color="primary"
              onClick={handleClickOpenDialog}
            >
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
      <Box sx={{ height: 450, width: "100%" }}>
        <DataGrid rows={clothes} columns={columns} loading={loading} />
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth="sm">
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <DialogTitle>Agregar Nueva Prenda</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              label="Código"
              name="code"
              variant="standard"
              fullWidth
              onChange={onChangeInputFormData}
              value={formData.code}
              required
            />

            <TextField
              label="Marca"
              name="brand"
              variant="standard"
              fullWidth
              onChange={onChangeInputFormData}
              value={formData.brand}
              required
            />

            <TextField
              label="Color"
              name="color"
              variant="standard"
              fullWidth
              onChange={onChangeInputFormData}
              value={formData.color}
            />

            <TextField
              label="Talla"
              name="size"
              variant="standard"
              fullWidth
              onChange={onChangeInputFormData}
              value={formData.size}
            />

            <TextField
              label="Precio"
              name="price"
              variant="standard"
              fullWidth
              onChange={onChangeInputFormData}
              value={formData.price}
            />

            <TextField
              label="Tipo de ropa"
              name="clothe_type"
              variant="standard"
              fullWidth
              onChange={onChangeInputFormData}
              value={formData.clothe_type}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDialog}
              variant="contained"
              type="button"
            >
              Cancelar
            </Button>
            <Button variant="contained" type="submit">
              Guardar
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Layout>
  );
};
