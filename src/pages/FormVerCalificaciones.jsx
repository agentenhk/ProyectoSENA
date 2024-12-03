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
import { get } from '../componentes/funciones/Funciones';
import useAuth from '../hooks/useAuth';

export const FormVerCalificaciones = () => {
  const [data, setData] = useState([]);
  const { auth } = useAuth() || {};
  
  const idusuarios = auth.idusuarios

  const optenerNotas = async () => {
    const respuesta = await get(`/calificar/notasestudiante/${idusuarios}`);
    const dato = await respuesta.json();
    console.log(dato)
    if (dato.status === 'succes') setData(dato.notas);
  };

  useEffect(() => {
    optenerNotas();
  }, []);

  return (
    <Box p={2}>
      {/* Título */}
      <Grid container justifyContent="center" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Hola {auth.nombre} estas son tus Notas.
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
                <TableCell>Asignatura</TableCell>
                <TableCell>1° Periodo</TableCell>
                <TableCell>2° Periodo</TableCell>
                <TableCell>3° Periodo</TableCell>
                <TableCell>4° Periodo</TableCell>
                <TableCell>Nota Final</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.nombre_asignatura}</TableCell>
                  <TableCell>{row.primer_periodo}</TableCell>
                  <TableCell>{row.segundo_periodo}</TableCell>
                  <TableCell>{row.tercer_periodo}</TableCell>
                  <TableCell>{row.cuarto_periodo}</TableCell>
                  <TableCell>{row.nota_final}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Box>
  );
};