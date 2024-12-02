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
import { obtenerUsuarios, obtenerCursos, asignarCurso, actualizarEstadoAsignacion, obtenerAsignaciones } from '../componentes/funciones/Funciones';

export const FormAsignarCursoEstudi = () => {
    const [formData, setFormData] = useState({
        id_usuario: '',
        id_curso: '',
    });

    const [estudiantes, setEstudiante] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [asignaciones, setAsignaciones] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const respuesta = await asignarCurso('/asignaciones/crear/estudiantecurso', formData);
        const dato = await respuesta.json();
        console.log(dato);
        setFormData({ id_usuario: '', id_curso: '' });
        obtenerAsignacionesLista();
    };

    const toggleEstadoAsignacion = async (id, estado) => {
        const nuevoEstado = estado === 'Activo' ? 2 : 1;
        const respuesta = await actualizarEstadoAsignacion('/asignaciones/actualizar', { id, estado: nuevoEstado });
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

    const obtenerEstudiantesLista = async () => {
        const respuesta = await obtenerUsuarios('/usuario/listar');
        const dato = await respuesta.json();
        // Filtrar los datos con perfil_idperfil igual a 2
        const datosFiltrados = dato.usuarios.filter(item => item.perfil_idperfil === 3);
        if (dato.status === 'succes') setEstudiante(datosFiltrados);
    };

    const obtenerCursosLista = async () => {
        const respuesta = await obtenerCursos('/cursos/listar');
        const dato = await respuesta.json();
        if (dato.status === 'succes') setCursos(dato.cursos);
    };

    const obtenerAsignacionesLista = async () => {
        const respuesta = await obtenerAsignaciones('/asignaciones/listar/estudiante');
        const dato = await respuesta.json();
        if (dato.status === 'succes') setAsignaciones(dato.asignaciones);
    };

    useEffect(() => {
        obtenerEstudiantesLista();
        obtenerCursosLista();
        obtenerAsignacionesLista();
    }, []);

    return (
        <Box p={2}>
            <Grid container spacing={2}>
                <Grid container justifyContent="center" alignItems="center">
                    <h1>Asignar Curso a Estudiante</h1>
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
                                        {estudiantes.map((estudiante) => (
                                            <MenuItem key={estudiante.idusuarios} value={estudiante.idusuarios}>
                                                {estudiante.nombre}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="curso-label">Curso</InputLabel>
                                    <Select
                                        labelId="curso-label"
                                        name="id_curso"
                                        value={formData.id_curso}
                                        onChange={handleChange}
                                        required
                                    >
                                        {cursos.map((curso) => (
                                            <MenuItem key={curso.idcursos} value={curso.idcursos}>
                                                {curso.nombre}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" fullWidth variant="contained" color="primary">
                                    Asignar Curso
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
                                    <TableCell>Curso</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {asignaciones.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.profesor_nombre}</TableCell>
                                        <TableCell>{row.curso_nombre}</TableCell>
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

