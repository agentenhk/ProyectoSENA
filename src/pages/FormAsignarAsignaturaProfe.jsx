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
import { get, post, put} from '../componentes/funciones/Funciones';

export const FormAsignarAsignaturaProfe = () => {
    const [formData, setFormData] = useState({
        id_usuario: '',
        id_asignatura: '',
    });

    const [profesores, setProfesores] = useState([]);
    const [asignaturas, setAsignaturas] = useState([]);
    const [asignaciones, setAsignaciones] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const respuesta = await post('/asignaciones/crear/profesorasignatura', formData);
        const dato = await respuesta.json();
        
        setFormData({ id_usuario: '', id_asignatura: '' });
        obtenerAsignacionesLista();
    };

    const toggleEstadoAsignacion = async (id, estado) => {
        const nuevoEstado = estado === 'Activo' ? 2 : 1;
        const respuesta = await put('/asignaciones/actualizar/asigpro', { id, estado: nuevoEstado });
        const dato = await respuesta.json();
        if (dato.status === 'succes') {
            setAsignaciones((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, estado: nuevoEstado } : item
                )
            );
            obtenerAsignacionesLista();
        } else {
            console.error('Error al actualizar el estado de la asignación');
        }
    };

    const obtenerProfesoresLista = async () => {
        const respuesta = await get('/usuario/listar');
        const dato = await respuesta.json();
        // Filtrar los datos con perfil_idperfil igual a 2
        const datosFiltrados = dato.usuarios.filter(item => item.perfil_idperfil === 2);
        if (dato.status === 'succes') setProfesores(datosFiltrados);
    };

    const obtenerAsignaturasLista = async () => {
        const respuesta = await get('/asignaturas/listar');
        const dato = await respuesta.json();
        if (dato.status === 'succes') setAsignaturas(dato.cursos);
    };

    const obtenerAsignacionesLista = async () => {
        const respuesta = await get('/asignaciones/listar/asignaturasprofe');
        const dato = await respuesta.json();
        if (dato.status === 'succes') setAsignaciones(dato.asignaciones);
    };

    useEffect(() => {
        obtenerProfesoresLista();
        obtenerAsignaturasLista();
        obtenerAsignacionesLista();
    }, []);

    return (
        <Box p={2}>
            <Grid container spacing={2}>
                <Grid container justifyContent="center" alignItems="center">
                    <h1>Asignar Curso a Profesor</h1>
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
                                <FormControl fullWidth>
                                    <InputLabel id="profesor-label">Profesor</InputLabel>
                                    <Select
                                        labelId="profesor-label"
                                        name="id_usuario"
                                        value={formData.id_usuario}
                                        onChange={handleChange}
                                        required
                                    >
                                        {profesores.map((profesor) => (
                                            <MenuItem key={profesor.idusuarios} value={profesor.idusuarios}>
                                                {profesor.nombre}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="curso-label">Asignaturas</InputLabel>
                                    <Select
                                        labelId="curso-label"
                                        name="id_asignatura"
                                        value={formData.id_asignatura}
                                        onChange={handleChange}
                                        required
                                    >
                                        {asignaturas.map((asignatura) => (
                                            <MenuItem key={asignatura.id} value={asignatura.id}>
                                                {asignatura.nombre_asignatura}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" fullWidth variant="contained" color="primary">
                                    Asignar Asignatura
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
                                    <TableCell>Profesor</TableCell>
                                    <TableCell>Asignatura</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {asignaciones.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.profesor_nombre}</TableCell>
                                        <TableCell>{row.asignatura_nombre}</TableCell>
                                        <TableCell>{row.estado}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={() => toggleEstadoAsignacion(row.id, row.estado)}
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
