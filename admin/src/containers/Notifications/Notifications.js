import { Layout } from "../../components/Layout";
import {
  Box,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { DataGrid } from '@mui/x-data-grid';

export const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns = [
    { field: 'code', headerName: 'Codigo', flex: 1 },
    { field: 'state', headerName: 'Estado', flex: 1 },
    { field: 'createdAt', headerName: 'Creado en', flex: 1 },
  ];

  const fetchUsers = async () => {
    const response = await axiosInstance.get('/notification');
    const { data } = response || {};
    const notificationsWithId = (data || []).map((item, index) => {
      item.id = index;
      return item;
    });

    setNotifications(notificationsWithId);
  }

  useEffect(() => {
    setLoading(true);
    try {
      fetchUsers();
    } catch (error) {
      const message = error.response.data.message || error.message;
      alert(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  }, [])

  return (
    <Layout>
      <Typography variant="h4">
        Notificaciones
      </Typography>
      <Box sx={{ height: 450, width: '100%' }}>
        <DataGrid
          rows={notifications}
          columns={columns}
          loading={loading}
        />
      </Box>
    </Layout>
  );
};
