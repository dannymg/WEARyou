import { Layout } from "../../components/Layout";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { DataGrid } from "@mui/x-data-grid";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns = [
    { field: "username", headerName: "Username", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "name", headerName: "Nombre", flex: 1 },
    { field: "last_name", headerName: "Apellido", flex: 1 },
    { field: "birth_date", headerName: "Fecha Nacimiento", flex: 1 },
    { field: "phone", headerName: "Teléfono", flex: 1 },
    { field: "direction", headerName: "Dirección", flex: 1 },
  ];

  const fetchUsers = async () => {
    const response = await axiosInstance.get("/user");
    const { data } = response || {};
    const usersWithId = (data || []).map((item, index) => {
      item.id = index;
      return item;
    });

    setUsers(usersWithId);
  };

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
  }, []);

  return (
    <Layout>
      <Typography variant="h4">Clientes</Typography>
      <Box sx={{ height: 450, width: "100%" }}>
        <DataGrid rows={users} columns={columns} loading={loading} />
      </Box>
    </Layout>
  );
};
