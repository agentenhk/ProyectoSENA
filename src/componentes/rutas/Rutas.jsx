import React from 'react'
import { Routes, Route, BrowserRouter, Link } from "react-router-dom"
import {Publico} from "../Publico"
import { Privado } from '../Privado'
import Login from "../Login"
import { AuthProvider } from '../../context/AuthProvider'
import { IndexPrivado } from '../IndexPrivado'
import { FormCrearUsuario } from '../../pages/FormCrearUsuario'
import { FormCrearCurso } from '../../pages/FormCrearCurso'
import { ListarUsuarios } from '../../pages/ListarUsuarios'
import { ListarCursos } from '../../pages/ListarCursos'
import {FormCalificarEstudiante} from '../../pages/FormCalificarEstudiante'
import {ListarEstudianteCurso} from '../../pages/ListarEstudianteCurso'
import {FormVerCalificaciones} from '../../pages/FormVerCalificaciones'




export const Rutas = () => {
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ruta publica */}
          <Route path="/" element={<Publico />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
          </Route>
          {/* ruta privado */}
          <Route path="/panel" element={<Privado />}>
            <Route index element={<IndexPrivado/>} />
            <Route path="FormCrearUsuario" element={<FormCrearUsuario />} />
            <Route path="FormCrearCurso" element={<FormCrearCurso/>} />
            <Route path="ListarUsuarios" element={<ListarUsuarios/>} />
            <Route path="ListarCursos" element={<ListarCursos/>} />
            <Route path="FormCalificarEstudiante" element={<FormCalificarEstudiante/>} />
            <Route path="ListarEstudianteCurso" element={<ListarEstudianteCurso/>} />
            <Route path="FormVerCalificaciones" element={<FormVerCalificaciones/>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
