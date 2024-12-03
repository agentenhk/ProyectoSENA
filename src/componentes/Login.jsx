import React, { useState } from 'react'
import { useForms } from './ayuda/useForms'
import {post,get} from './funciones/Funciones'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { Box, Grid } from '@mui/material';
import '../assets/Login.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function Login() {

    const {form, actualizado} = useForms() 
    const {setAuth} = useAuth();

    const navegar = useNavigate()
    const validarDatos = async (e) => {
        e.preventDefault()
        let parametros = form
        const respuesta = await post('usuario/login', parametros)
        const dato = await respuesta.json()
        
        if(dato.status == 'succes' && dato.validar == 1){
            // setear datos en el auth
            /* const idusuarios = dato.usuario.idusuarios
            const respuestaPermisos = await get('/usuario/obtenerPermiso/'+idusuarios)
            const datoPermiso = await respuestaPermisos.json() */
            // Persistir los datos en el navegador 
            localStorage.setItem("usuario", JSON.stringify(dato.usuario));
            setAuth(dato.usuario)
            // Redireccion 
            setTimeout(()=>{
                window.location.reload();
            },1000);
            
        }
        
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
                <Grid container justifyContent="center" alignItems="center">
                    <h1>MyAcademy</h1>
                </Grid>
            </Box>
            <form className="form" onSubmit={validarDatos}>
                <span className="input-span">
                    <label htmlFor="email" className="label">Email</label>
                    <input type="email" name="email" id="email" onChange={actualizado}/>
                </span>
                <span className="input-span">
                    <label htmlFor="password" className="label">Password</label>
                    <input type="password" name="password" id="password" onChange={actualizado} />
                </span>
                <input className="submit" type="submit" value="Login" />
            </form>

        </>
    )
}
