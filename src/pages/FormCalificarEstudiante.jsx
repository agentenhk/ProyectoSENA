import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import useAuth from '../hooks/useAuth';
import { get, post, put } from '../componentes/funciones/Funciones'


export const FormCalificarEstudiante = () => {

  const { auth } = useAuth() || {};


  const [cursos, setCursos] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [selectedCurso, setSelectedCurso] = useState('');
  const [tablaDatos, setTablaDatos] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [formData, setFormData] = useState({
    id_estudiante: '',
    estudiante_nombre: '',
    id_curso: '',
    id_asignatura: '',
    id_profesor: '',
    id_periodo: '',
    nombre_asignatura: '',
    primer_periodo: '',
    segundo_periodo: '',
    tercer_periodo: '',
    cuarto_periodo: '',
    nota_final: '',
  });

  const optenerPeriodos = async () => {
    const respuesta = await get('/periodos/listar');
    const dato = await respuesta.json();
    console.log(dato)
    if (dato.status === 'succes') setPeriodos(dato.periodos);
  };

  const traer_curso_profe = async () => {
    const id = auth.idusuarios
    const respuesta = await get(`/calificar/profesor/${id}/cursos`);
    const dato = await respuesta.json();
    if (dato.status === 'succes') setCursos(dato.cursos);
  }

  useEffect(() => {
    optenerPeriodos()
    traer_curso_profe()
  }, []);



  const handleCursoChange = async (e) => {
    const id_curso = e.target.value;
    const id_usuario = auth.idusuarios
    setSelectedCurso(id_curso);
    setEstudiantes([]);
    setTablaDatos([]);

    // Simula la carga de estudiantes y asignaturas
    const respuesta = await get(`/calificar/profesores/${id_usuario}/${id_curso}/estudiantes`);
    const dato = await respuesta.json();
    if (dato.status === 'succes') {


      // Construye la tabla inicial con datos vacíos para las notas
      const nuevaTabla = dato.estudiantes.map((estudiante) => ({
        id_estudiante: estudiante.estudiante_id,
        estudiante_nombre: estudiante.estudiante_nombre,
        id_curso: id_curso,
        id_asignatura: estudiante.id_asignatura,
        id_profesor: auth.idusuarios,
        id_periodo: periodos[0].id,
        nombre_asignatura: estudiante.nombre_asignatura,
        primer_periodo: estudiante.primer_periodo,
        segundo_periodo: estudiante.segundo_periodo,
        tercer_periodo: estudiante.tercer_periodo,
        cuarto_periodo: estudiante.cuarto_periodo,
        nota_final: estudiante.nota_final,
      }));
      // Actualiza el estado con los nuevos datos
      setEstudiantes(dato.estudiantes);
      setTablaDatos(nuevaTabla);
    }
  };

  const handleNotaChange = (index, field, value) => {
    const nuevaTabla = [...tablaDatos];
    nuevaTabla[index][field] = value;

    // Calcula la nota final automáticamente si todos los periodos tienen notas
    const { primer_periodo, segundo_periodo, tercer_periodo, cuarto_periodo } = nuevaTabla[index];
    if (primer_periodo && segundo_periodo && tercer_periodo && cuarto_periodo) {
      nuevaTabla[index].nota_final = (
        (parseFloat(primer_periodo) +
          parseFloat(segundo_periodo) +
          parseFloat(tercer_periodo) +
          parseFloat(cuarto_periodo)) /
        4
      ).toFixed(2);
    } else {
      nuevaTabla[index].nota_final = '';
    }
    setTablaDatos(nuevaTabla);
  };


  const handleGuardar = async () => {
    for (const tb of tablaDatos) {
      // Convertir las notas a números flotantes
      const datosEnvio = {
        id_estudiante: tb.id_estudiante,
        id_curso: tb.id_curso,
        id_asignatura: tb.id_asignatura,
        id_profesor: tb.id_profesor,
        id_periodo: tb.id_periodo,
        primer_periodo: parseFloat(tb.primer_periodo),
        segundo_periodo: parseFloat(tb.segundo_periodo),
        tercer_periodo: parseFloat(tb.tercer_periodo),
        cuarto_periodo: parseFloat(tb.cuarto_periodo),
        nota_final: parseFloat(tb.nota_final)
      };
      const respuesta = await put('/calificar/actualizarCalificacion', datosEnvio);
      const dato = await respuesta.json();
      console.log(dato)
    }


  };

  const handleActualizar = async () => {
    for (const tb of tablaDatos) {
      // Convertir las notas a números flotantes
      const datosEnvio = {
        id_estudiante: tb.id_estudiante,
        id_curso: tb.id_curso,
        id_asignatura: tb.id_asignatura,
        id_profesor: tb.id_profesor,
        id_periodo: tb.id_periodo,
        primer_periodo: parseFloat(tb.primer_periodo),
        segundo_periodo: parseFloat(tb.segundo_periodo),
        tercer_periodo: parseFloat(tb.tercer_periodo),
        cuarto_periodo: parseFloat(tb.cuarto_periodo),
        nota_final: parseFloat(tb.nota_final)
      };
      if (datosEnvio.primer_periodo == 0 || datosEnvio.segundo_periodo == 0 || datosEnvio.tercer_periodo == 0 || datosEnvio.cuarto_periodo == 0 || datosEnvio.nota_final == 0) {
        // Enviar los datos por POST a tu servidor
        const respuesta = await post('/calificar/crear', datosEnvio);
        const dato = await respuesta.json();
        console.log(dato)
      } else {
        const notasActualizar = {
          id_estudiante: tb.id_estudiante,
          id_curso: tb.id_curso,
          id_asignatura: tb.id_asignatura,
          id_profesor: tb.id_profesor,
          id_periodo: tb.id_periodo,
          primer_periodo: parseFloat(tb.primer_periodo),
          segundo_periodo: parseFloat(tb.segundo_periodo),
          tercer_periodo: parseFloat(tb.tercer_periodo),
          cuarto_periodo: parseFloat(tb.cuarto_periodo),
          nota_final: parseFloat(tb.nota_final)
        };
        const respuesta = await put('/calificar/actualizarCalificacion', notasActualizar);
        const dato = await respuesta.json();
        console.log(dato)
      }

    }

  };


  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>Calificar Estudiantes</h1>
        </Grid>

        {/* Filtro por curso */}
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="curso-label">Curso</InputLabel>
            <Select
              labelId="curso-label"
              value={selectedCurso}
              onChange={handleCursoChange}
            >
              {cursos.map((curso) => (
                <MenuItem key={curso.idcursos} value={curso.idcursos}>
                  {curso.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Tabla de calificaciones */}
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Estudiante</TableCell>
                  <TableCell>Asignatura</TableCell>
                  <TableCell>1° Periodo</TableCell>
                  <TableCell>2° Periodo</TableCell>
                  <TableCell>3° Periodo</TableCell>
                  <TableCell>4° Periodo</TableCell>
                  <TableCell>Nota Final</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tablaDatos.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.estudiante_nombre}</TableCell>
                    <TableCell>{row.nombre_asignatura}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={row.primer_periodo}
                        onChange={(e) =>
                          handleNotaChange(index, 'primer_periodo', e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={row.segundo_periodo}
                        onChange={(e) =>
                          handleNotaChange(index, 'segundo_periodo', e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={row.tercer_periodo}
                        onChange={(e) =>
                          handleNotaChange(index, 'tercer_periodo', e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={row.cuarto_periodo}
                        onChange={(e) =>
                          handleNotaChange(index, 'cuarto_periodo', e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>{row.nota_final}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Botón para guardar notas */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGuardar}
            disabled={tablaDatos.length === 0}
          >
            Guardar Notas
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleActualizar}
            disabled={tablaDatos.length === 0}
          >
            Actualizar Notas
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
