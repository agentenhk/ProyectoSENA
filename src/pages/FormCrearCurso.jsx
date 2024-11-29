import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';

export const FormCrearCurso = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo_electronico: '',
    contrasena: '',
    confirmar_contrasena: '',
    perfil_idperfil: '',
  });

  const [data, setData] = useState([]); // Estado para los datos guardados

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.contrasena !== formData.confirmar_contrasena) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const newData = {
      ...formData,
      idusuarios: data.length + 1,
      estado: 'Activo', // Estado inicial
    };
    setData([...data, newData]);
    setFormData({
      nombre: '',
      apellido: '',
      correo_electronico: '',
      contrasena: '',
      confirmar_contrasena: '',
      perfil_idperfil: '',
    });
  };

  // Cambiar el estado del usuario entre "Activo" e "Inactivo"
  const toggleEstado = (id) => {
    const updatedData = data.map((item) =>
      item.idusuarios === id
        ? { ...item, estado: item.estado === 'Activo' ? 'Inactivo' : 'Activo' }
        : item
    );
    setData(updatedData);
  };

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid container justifyContent="center" alignItems="center">
            <h1>Crear Curso</h1>
        </Grid>
        {/* Formulario */}
        <Grid item xs={12} md={6}>
          <Box component="form" onSubmit={handleSubmit} p={2} boxShadow={3} borderRadius={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Correo Electrónico"
                  type="email"
                  name="correo_electronico"
                  value={formData.correo_electronico}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Contraseña"
                  type="password"
                  name="contrasena"
                  value={formData.contrasena}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirmar Contraseña"
                  type="password"
                  name="confirmar_contrasena"
                  value={formData.confirmar_contrasena}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="perfil-label">Perfil</InputLabel>
                  <Select
                    labelId="perfil-label"
                    name="perfil_idperfil"
                    value={formData.perfil_idperfil}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Profesor">Profesor</MenuItem>
                    <MenuItem value="Estudiante">Estudiante</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" fullWidth variant="contained" color="primary">
                  Crear Usuario
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Tabla */}
        <Grid item xs={12} md={6}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Apellido</TableCell>
                  <TableCell>Correo</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Perfil</TableCell>
                  <TableCell>Acciones</TableCell>
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
                    <TableCell>
                      <IconButton
                        onClick={() => toggleEstado(row.idusuarios)}
                        color={row.estado === 'Activo' ? 'primary' : 'secondary'}
                      >
                        {row.estado === 'Activo' ? <ToggleOnIcon /> : <ToggleOffIcon />}
                      </IconButton>
                    </TableCell>
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
