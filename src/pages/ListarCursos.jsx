import React, { useState } from 'react';
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

export const ListarCursos = () => {
  const [data, setData] = useState([
    {
      idusuarios: 1,
      nombre: "Juan",
      apellido: "Pérez",
      correo_electronico: "juan.perez@example.com",
      estado: "Activo",
      perfil_idperfil: "Admin",
    },
    {
      idusuarios: 2,
      nombre: "Ana",
      apellido: "Gómez",
      correo_electronico: "ana.gomez@example.com",
      estado: "Inactivo",
      perfil_idperfil: "Profesor",
    },
  ]); // Datos de ejemplo

  return (
    <Box p={2}>
      {/* Título */}
      <Grid container justifyContent="center" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Listar Usuarios
        </Typography>
      </Grid>

      {/* Tabla */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Apellido</TableCell>
                  <TableCell>Correo</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Perfil</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.idusuarios}>
                    <TableCell>{row.idusuarios}</TableCell>
                    <TableCell>{row.nombre}</TableCell>
                    <TableCell>{row.apellido}</TableCell>
                    <TableCell>{row.correo_electronico}</TableCell>
                    <TableCell>{row.estado}</TableCell>
                    <TableCell>{row.perfil_idperfil}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};
