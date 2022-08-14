import {
  IconButton,
  Container,
  Tooltip,
  Toolbar,
  Box,
  AppBar,
  Button,
  MenuItem,
  Typography,
  Menu,
  Avatar,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isUserAuthenticated } from "../../utils/utils";
import { LoginFormDialog } from "../LoginFormDialog";

export const TopBar = () => {
  let navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [productCounter, setProductCounter] = useState(0);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () => {
    setOpenLoginDialog(true);
  };

  const handleClose = () => {
    setOpenLoginDialog(false);
  };

  const handleNavigate = (page) => {
    navigate(page.path);
  };

  const handleProductCounter = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let productCounter = 0;
    cart.forEach((clothe) => {
      productCounter += 1;
    });
    setProductCounter(productCounter);
  };
  const pages = [
    {
      id: 0,
      name: "Home",
      path: "/",
    },
    {
      id: 1,
      name: "Carrito",
      path: "/cart",
    },
  ];

  const settingsMenu = [
    {
      id: 0,
      name: "Cuenta",
      onClick: () => {
        navigate("/");
      },
    },
    {
      id: 1,
      name: "Cerrar sesión",
      onClick: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("LogOut"));
        navigate("/");
      },
    },
  ];

  useEffect(() => {
    handleProductCounter();
    window.addEventListener("addProductToCart", () => {
      handleProductCounter();
    });
    window.addEventListener("removeProductFromCart", () => {
      handleProductCounter();
    });
    window.addEventListener("LogOut", () => {
      handleProductCounter();
    });
  }, []);

  const userIsAuthenticated = isUserAuthenticated();
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <Tooltip title="Inicio" arrow>
              <IconButton
                color="inherit"
                key={pages[0].name}
                onClick={() => handleNavigate(pages[0])}
              >
                <HomeIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ flexGrow: 0 }} marginRight={2}>
            <IconButton
              color="inherit"
              key={pages[1].name}
              onClick={() => handleNavigate(pages[1])}
            >
              <Badge
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={productCounter}
                color="secondary"
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
          {!userIsAuthenticated && (
            <Box sx={{ flexGrow: 0 }}>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => handleLogin()}
              >
                Iniciar Sesion
              </Button>
            </Box>
          )}
          {userIsAuthenticated && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Abrir configuraciones" arrow>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settingsMenu.map((setting) => (
                  <MenuItem key={setting.id} onClick={setting.onClick}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
      <LoginFormDialog open={openLoginDialog} onClose={handleClose} />
    </AppBar>
  );
};
