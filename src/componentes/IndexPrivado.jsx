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
        { label: "Crer usuarios", link: "#", icon: "🏠" },
        { label: "Listar usuarios", link: "#", icon: "👥" },
        { label: "Crear curso", link: "#", icon: "⚙️" },
        { label: "Listar curso", link: "#", icon: "⚙️" },
        { label: "Salir", link: "/", icon: "⚙️" },
    ];

    const sidebarOptionsProfe = [
        { label: "Calificar estudiantes", link: "#", icon: "🏠" },
        { label: "Listar Estudiantes", link: "#", icon: "👥" },
        { label: "Salir", link: "/", icon: "⚙️" },
    ];

    const sidebarOptionsEstu = [
        { label: "Ver calificaciones", link: "#", icon: "⚙️" },
        { label: "Salir", link: "/", icon: "⚙️" },
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
