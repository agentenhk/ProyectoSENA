import React, { useState, useEffect } from 'react';
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
import { obtenerCursos } from '../componentes/funciones/Funciones';

export const ListarCursos = () => {
  const [data, setData] = useState([]);

  const optenerCursos = async () => {
    const respuesta = await obtenerCursos('/cursos/listar');
    const dato = await respuesta.json();
    console.log(dato)
    if (dato.status === 'succes') setData(dato.usuarios);
  };

  useEffect(() => {
    optenerCursos();
  }, []);

  return (
    <Box p={2}>
      {/* Título */}
      <Grid container justifyContent="center" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Listar Cursos
        </Typography>
      </Grid>

      {/* Tabla */}
      <Grid item xs={12} md={6}>
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: '400px',
            overflowY: 'auto',
            boxShadow: 3,
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Fecha</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.idcursos}>
                  <TableCell>{row.idcursos}</TableCell>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell>{row.estado === 'Activo' ? 'Activo' : 'Inactivo'}</TableCell> {/* Mostrar "Activo" o "Inactivo" */}
                  <TableCell>
                    {new Date(row.fecha_registro).toLocaleDateString('es-ES')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Box>
  );
};
