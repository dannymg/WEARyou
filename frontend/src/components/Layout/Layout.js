import { Box, Container, Grid } from '@mui/material';
import { TopBar } from '../TopBar';
import { BottomBar } from '../BottomBar';
import { useStyles } from './Layout.style';

export const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TopBar></TopBar>
        </Grid>
        <Grid item xs={12}>
          <Container className={classes.container}>
            {children}
          </Container>
        </Grid>
        <Grid item xs={12}>
          <BottomBar></BottomBar>
        </Grid>
      </Grid>
    </Box>
  );
}
