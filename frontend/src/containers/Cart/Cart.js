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
  Icon,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { isUserAuthenticated } from "../../utils/utils";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

export const Cart = () => {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClothes = async () => {
    const data = JSON.parse(localStorage.getItem("cart")) || {};
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

  const handleIncrementQuantity = (clothe) => {
    try {
      let cart = JSON.parse(localStorage.getItem("cart"));
      if (cart == null) {
        cart = [];
      }

      cart.forEach((clotheSaved) => {
        if (clothe.code === clotheSaved.code) {
          clotheSaved.quantity += 1;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      fetchClothes();
    } catch (error) {
      const message = error.response.data.message || error.message;
      alert(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDecrementQuantity = (clothe) => {
    try {
      let cart = JSON.parse(localStorage.getItem("cart"));
      if (cart == null) {
        cart = [];
      }

      cart.forEach((clotheSaved) => {
        if (clothe.code === clotheSaved.code) {
          if (clotheSaved.quantity > 1) {
            clotheSaved.quantity -= 1;
          }
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      fetchClothes();
    } catch (error) {
      const message = error.response.data.message || error.message;
      alert(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = (clothe) => {
    try {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      let indexCounter = 0;
      for (let i = 0; i < cart.length; i++) {
        if (clothe.code === cart[i].code) {
          indexCounter = i;
        }
      }

      cart.splice(indexCounter, 1);
      localStorage.setItem("cart", JSON.stringify(cart));

      fetchClothes();
      window.dispatchEvent(new Event("removeProductFromCart"));
    } catch (error) {
      const message = error.response.data.message || error.message;
      alert(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
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
                <Box sx={{ mr: 1 }} borderRadius="10%">
                  <Button onClick={() => handleDecrementQuantity(clothe)}>
                    <RemoveCircleRoundedIcon />
                  </Button>
                  <Typography
                    variant="h5"
                    display={"inline"}
                    color="text.secondary"
                  >
                    {clothe.quantity}
                  </Typography>
                  <Button onClick={() => handleIncrementQuantity(clothe)}>
                    <AddCircleRoundedIcon />
                  </Button>
                </Box>
                <Box sx={{ mr: 1 }} borderRadius="10%">
                  <Button onClick={() => handleDeleteProduct(clothe)}>
                    <DeleteForeverRoundedIcon />
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};
