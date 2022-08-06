import {
  IconButton,
  Container,
  Tooltip,
  Toolbar,
  Box,
  AppBar,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";

// const settings = ['Profile', 'Logout'];

export const TopBar = () => {
  //const [anchorElUser, setAnchorElUser] = React.useState(null);

  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

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
          <Box sx={{ flexGrow: 0 }}>
            <Button variant="outlined" color="inherit">
              Iniciar Sesion
            </Button>
          </Box>
          {/* <Box sx={{ flexGrow: 0 }}>
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
