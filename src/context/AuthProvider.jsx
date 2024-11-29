import React, { createContext, useEffect, useState } from 'react'

export const api = 'http://localhost:3000/api/'

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);
    const [seccion, setSeccion] = useState(false)

    useEffect(() => {
        authUser();
    }, []);

    const authUser = async () => {
        // sacar datos del usuario identificado del localstorage

        const usuario = localStorage.getItem("usuario");

        // Comprobar si tengo el user 
        if (!usuario) {
            setCargando(false);
            setSeccion(false)
            return false;
        }

        // Transformar los datos a un objeto de javascript
        const userObj = JSON.parse(usuario);
        const userId = userObj.idusuarios;

        // Peticion ajax al bakend que compruebe el token y que me devuelva 
        // todos los datos del usuario 

        const request = await fetch(api+"usuario/obtenerPermiso/" + userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await request.json();
        console.log(data)

        // Setear el estado de auth
        setAuth(data.usuario);

        // cargando
        setCargando(false);
        // control seccion
        setSeccion(true)

    }

  return (
    <AuthContext.Provider
        value={{
            auth,
            setAuth,
            cargando,
            setCargando,
            seccion,
            setSeccion
        }}
    >
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;