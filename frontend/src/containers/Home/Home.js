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
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export const Home = () => {
  const clothes = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },

    {
      id: 6,
    },
    {
      id: 7,
    },
  ];

  return (
    <Layout>
      <CssBaseline />
      <Grid spacing={2} container>
        {clothes.map(({ id }) => (
          <Grid key={id} item sm={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image="https://picsum.photos/200/300?random"
                alt="clothes"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Camiseta
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua
                </Typography>
              </CardContent>
              <CardActions>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" fontWeight={"bold"}>
                    $10
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
                  >
                    Agregar al carrito
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
