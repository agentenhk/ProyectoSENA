import React, { useState, useEffect } from 'react';
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
import { post, get, put } from '../componentes/funciones/Funciones';

export const FormCrearUsuario = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo_electronico: '',
        contrasena: '',
        confirmar_contrasena: '',
        perfil_idperfil: '',
    });

    const [roles, setRoles] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const respuesta = await post('/usuario/crear', formData);
        const dato = await respuesta.json();
        console.log(dato)
        setFormData({
            nombre: '',
            apellido: '',
            correo_electronico: '',
            contrasena: '',
            confirmar_contrasena: '',
            perfil_idperfil: '',
        });
        optenerUsuarios();
    };

    // Modificar toggleEstado para que haga la petición PUT
    const toggleEstado = async (id, estado) => {
        // Cambia entre 1 (Activo) y 0 (Inactivo)
        const nuevoEstado = estado === 1 ? 2 : 1;  // Si es '1' lo cambia a '0' (Inactivo), si es '0' lo cambia a '1' (Activo)

        const parametros = { id, estado: nuevoEstado }; // Parámetros para la petición

        // Enviar la solicitud PUT para actualizar el estado
        const respuesta = await put('/usuario/actualizarestado', parametros);
        const dato = await respuesta.json();

        if (dato.status === "succes") {
            // Actualizar el estado localmente en la tabla
            setUsuarios((prev) =>
                prev.map((item) =>
                    item.idusuarios === id
                        ? { ...item, estado: nuevoEstado === 1 ? 'Activo' : 'Inactivo' } // Actualiza el estado
                        : item
                )
            );
        } else {
            console.error("Error al actualizar el estado del usuario");
        }
    };


    const optenerRoles = async () => {
        const respuesta = await get('/roles/usuario');
        const dato = await respuesta.json();
        if (dato.status === 'succes') setRoles(dato.roles);
    };

    const optenerUsuarios = async () => {
        const respuesta = await get('/usuario/listar');
        const dato = await respuesta.json();
        console.log(dato)
        if (dato.status === 'succes') setUsuarios(dato.usuarios);
    };

    useEffect(() => {
        optenerRoles();
        optenerUsuarios();
    }, []);

    return (
        <Box p={2}>
            <Grid container spacing={2}>
                <Grid container justifyContent="center" alignItems="center">
                    <h1>Crear Usuarios</h1>
                </Grid>

                {/* Formulario */}
                <Grid item xs={12} md={6}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        p={2}
                        boxShadow={3}
                        borderRadius={2}
                        sx={{
                            maxWidth: '500px',
                            margin: 'auto',
                        }}
                    >
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
                                        {roles.map((rol) => (
                                            <MenuItem key={rol.idrol} value={rol.idrol}>
                                                {rol.nombre_rol}
                                            </MenuItem>
                                        ))}
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
                                    <TableCell>Apellido</TableCell>
                                    <TableCell>Correo</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Perfil</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {usuarios.map((row) => (
                                    <TableRow key={row.idusuarios}>
                                        <TableCell>{row.idusuarios}</TableCell>
                                        <TableCell>{row.nombre}</TableCell>
                                        <TableCell>{row.apellido}</TableCell>
                                        <TableCell>{row.correo_electronico}</TableCell>
                                        <TableCell>{row.estado === 'Activo' ? 'Activo' : 'Inactivo'}</TableCell> {/* Mostrar "Activo" o "Inactivo" */}
                                        <TableCell>{row.nombre_rol}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={() => toggleEstado(row.idusuarios, row.estado === 'Activo' ? 1 : 2)} // Llama correctamente con 1 o 0
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