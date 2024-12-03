import React from 'react'
import { Panel } from './Panel'
import { Dashboard } from '../pages/Dashboard'
import useAuth from '../hooks/useAuth';

export const IndexPrivado = () => {
    const { cargando, seccion, auth } = useAuth() || {};
    console.log(cargando, seccion, auth)

    const user = {
        name: `Welcome ${auth.nombre}  Perfil ${auth.nombre_rol}`, 
        photo: "https://via.placeholder.com/40",
    };

    const sidebarOptionsAdmin = [
        { label: "Crear usuarios", link: "/panel/FormCrearUsuario", icon: "🏠" },
        { label: "Listar usuarios", link: "/panel/ListarUsuarios", icon: "👥" },
        { label: "Crear curso", link: "/panel/FormCrearCurso", icon: "⚙️" },
        { label: "Listar curso", link: "/panel/ListarCursos", icon: "⚙️" },
        { label: "Crear asignaturas", link: "/panel/FormCrearAsignatura", icon: "⚙️" },
        { label: "Listar asignaturas", link: "/panel/ListarAsignaturas", icon: "⚙️" },
        { label: "Crear periodo", link: "/panel/FormCrearPeriodo", icon: "⚙️" },
        { label: "Asignacion curso profesor", link: "/panel/FormAsignarCursoProfe", icon: "⚙️" },
        { label: "Asignacion curso estudiante", link: "/panel/FormAsignarCursoEstudi", icon: "⚙️" },
    ];

    const sidebarOptionsProfe = [
        { label: "Calificar estudiantes", link: "/panel/FormCalificarEstudiante", icon: "🏠" },
        { label: "Listar Estudiantes", link: "/panel/ListarEstudianteCurso", icon: "👥" },
    ];

    const sidebarOptionsEstu = [
        { label: "Ver calificaciones", link: "#", icon: "⚙️" },
    ];
    const getSidebarOptions = (rol) => {
        if (rol === "admin") {
            return sidebarOptionsAdmin;
        } else if (rol === "Profesor") {
            return sidebarOptionsProfe;
        } else if (rol === "Estudiante") {
            return sidebarOptionsEstu;
        } else {
            return []; // O puedes retornar null o un mensaje de error si el rol no es reconocido
        }
    };
    return (
        <div>
            <Panel user={user} sidebarOptions={getSidebarOptions(auth.nombre_rol)}>
                <Dashboard rol={auth.nombre_rol} name={auth.nombre}/>
            </Panel>
        </div>
    )
}
