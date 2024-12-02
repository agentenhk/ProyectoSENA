import React from 'react';
import { Cardcomp } from './Cardcomp';
import { Box, Grid } from '@mui/material';



export const Dashboard = ({rol,name}) => {
    
    const cardAdmin = [
        {
             title: 'Crear usuario',
             image: 'data:image/jpeg;base64,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',
             description: 'Gestiona los usuarios del sistema',
             link: 'FormCrearUsuario'
        },
        {
             title: 'Listar usuarios',
             image: 'https://img.freepik.com/vector-premium/lista-verificacion-completa-ilustracion-plana-mujer-dibujos-animados_74855-18269.jpg',
             description: 'Listar los usuarios del sistema',
             link: 'ListarUsuarios'
        },
        {
             title: 'Crear curso',
             image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvZkX-X0OYzgVVSLf14XZWpRFOypBeHkDsHw&s',
             description: 'Crear los Cursos del sistema',
             link: 'FormCrearCurso'
        },
        {
             title: 'Listar curso',
             image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnvTxzYxOHEKO0OXyCfF8OLSAZhpMsRroYQA&s',
             description: 'Listar los Cursos del sistema',
             link: 'ListarCursos'
        },
        {
            title: 'Asignación curso Profesor',
            image: 'https://st4.depositphotos.com/23336614/30975/v/950/depositphotos_309754244-stock-illustration-presentation-class-teacher-meeting-icon.jpg',
            description: 'Este modulo nos ayuda a asignar a cada profesor un curso',
            link: 'FormAsignarCursoProfe'
       },
       {
        title: 'Asignación curso estudiantes',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSXszfovAk7An4vfrFY8_9Unz_8IN9fdGN4g&s',
        description: 'Este modulo nos ayuda a asignar a cada profesor un curso',
        link: 'FormAsignarCursoEstudi'
       }
    ];

    const cardProfe = [
        {
             title: 'Calificar estudiante',
             image: 'https://img.freepik.com/vector-premium/lista-verificacion-completa-ilustracion-plana-mujer-dibujos-animados_74855-18269.jpg',
             description: 'Listar los usuarios del sistema',
             link: 'FormCalificarEstudiante'
        },
        {
             title: 'Listar estudiante',
             image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnvTxzYxOHEKO0OXyCfF8OLSAZhpMsRroYQA&s',
             description: 'Listar los Cursos del sistema',
             link: 'ListarEstudianteCurso'
        }
    ];

    const cardEstu = [
        {
             title: 'Ver Calificaciones',
             image: 'https://img.freepik.com/vector-premium/lista-verificacion-completa-ilustracion-plana-mujer-dibujos-animados_74855-18269.jpg',
             description: 'Listar los usuarios del sistema',
             link: '/admin/users'
        },
    ];

    let cardsToRender = [];

    if (rol === "admin") {
        cardsToRender = cardAdmin;
    } else if (rol === "Profesor") {
        cardsToRender = cardProfe;
    } else if (rol === "Estudiante") {
        cardsToRender = cardEstu;
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
                <Grid container justifyContent="center" alignItems="center">
                    <h1>Welcome to the Admin MyAcademy</h1>
                </Grid>
            </Box>
            <Box sx={{ padding: '10px' }}>
                <Grid container spacing={4} justifyContent="center">
                    {cardsToRender.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Cardcomp
                                title={item.title}
                                image={item.image}
                                description={item.description}
                                link={item.link}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
};
