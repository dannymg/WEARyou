import { Layout } from "../../components/Layout";
import {
  Box,
  Card,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  CssBaseline,
  Typography,
  CircularProgress,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { isUserAuthenticated } from "../../utils/utils";
import { AlertDialog } from "../../components/AlertDialog";
import { AccountFormDialog } from "./AccountFormDialog";

export const Home = () => {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [openNewAccountDialog, setOpenNewAccountDialog] = useState(false);

  const fetchClothes = async () => {
    const response = await axiosInstance.get("/clothe");
    const { data } = response || {};
    let cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
    const clothesWithId = (data || []).map((item, index) => {
      item.id = index;
      let clotheExists = false;
      cartStorage.forEach((clothe) => {
        if (item.id == clothe.id) {
          clotheExists = true;
        }
      });
      item.disabled = clotheExists;
      return item;
    });

    setClothes(clothesWithId);
  };

  const handleAddToCart = (clothe) => {
    if (!isUserAuthenticated()) {
      setOpenAlertDialog(true);
      return;
    } else {
      try {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (cart == null) {
          cart = [];
        }
        let clotheExists = false;
        cart.forEach((clotheSaved) => {
          if (clothe.code === clotheSaved.code) {
            clotheExists = true;
          }
        });
        if (clotheExists) {
          // alert("El producto ya ha sido agregado previamente");
        } else {
          clothe.quantity = 1;
          cart.push(clothe);
          localStorage.setItem("cart", JSON.stringify(cart));
          // alert("Producto agregado correctamente");
          window.dispatchEvent(new Event("addProductToCart"));
          window.dispatchEvent(new Event("disableProduct"));
        }
      } catch (error) {
        const message = error.response.data.message || error.message;
        alert(`Error: ${message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    try {
      fetchClothes();
      window.addEventListener("disableProduct", () => {
        fetchClothes();
      });
      window.addEventListener("LogOut", () => {
        fetchClothes();
      });
    } catch (error) {
      const message = error.response.data.message || error.message;
      alert(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleClose = () => {
    setOpenAlertDialog(false);
    setOpenNewAccountDialog(false);
  };

  const handleOk = () => {
    setOpenAlertDialog(false);
    setOpenNewAccountDialog(true);
  };

  if (loading) {
    return (
      <Layout>
        <Box
          minHeight={"75vh"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <CssBaseline />
      <Grid spacing={2} container minHeight={"75vh"}>
        {clothes.map((clothe, index) => (
          <Grid key={index} item sm={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image="https://picsum.photos/200/300?random"
                alt="clothes"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {clothe.clothe_type}
                </Typography>
                <Typography gutterBottom variant="body1" color="text.secondary">
                  {clothe.brand}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Color: {clothe.color}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Talla: {clothe.size}
                </Typography>
              </CardContent>
              <CardActions>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" fontWeight={"bold"}>
                    ${clothe.price}
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                  {/*<Tooltip title="Agregar al carrito de compras" arrow>
                   <IconButton >
                    <AddShoppingCartIcon />
                  </IconButton>
                </Tooltip> */}
                  <Button
                    startIcon={<AddShoppingCartIcon />}
                    variant="outlined"
                    onClick={() => handleAddToCart(clothe)}
                    disabled={clothe.disabled}
                  >
                    Agregar al carrito
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <AlertDialog
        open={openAlertDialog}
        onClickCancel={handleClose}
        onClickOk={handleOk}
        description={"Debes iniciar sesión para agregar al carrito"}
        okButtonText={"Crear Cuenta"}
      />
      <AccountFormDialog open={openNewAccountDialog} onClose={handleClose} />
    </Layout>
  );
};
