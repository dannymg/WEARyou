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
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { isUserAuthenticated } from "../../utils/utils";

export const TopBar = () => {
  let navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settingsMenu = [
    {
      id: 1,
      name: "Cerrar sesión",
      onClick: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }
    }

  ];

  const userIsAuthenticated = isUserAuthenticated()

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <Tooltip title="Inicio" arrow>
              <IconButton color="inherit">
                <HomeIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ flexGrow: 0 }} marginRight={2}>
            <IconButton color="inherit">
              <ShoppingCartIcon />
            </IconButton>
          </Box>
          {!userIsAuthenticated && <Box sx={{ flexGrow: 0 }}>
            <Button variant="outlined" color="inherit">
              Iniciar Sesion
            </Button>
          </Box>}
          {userIsAuthenticated && <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Abrir configuraciones" arrow>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settingsMenu.map((setting) => (
                <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
