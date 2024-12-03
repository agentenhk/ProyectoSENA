import React, { useState, useEffect} from 'react';
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
import {get} from '../componentes/funciones/Funciones';

export const ListarUsuarios = () => {
  const [data, setData] = useState([]);

  const optenerUsuarios = async () => {
    const respuesta = await get('/usuario/listar');
    const dato = await respuesta.json();
    console.log(dato)
    if (dato.status === 'succes') setData(dato.usuarios);
};

useEffect(() => {
    optenerUsuarios();
}, []);

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
                    <TableCell>{row.nombre_rol}</TableCell>
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
