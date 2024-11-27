import React from 'react'
import { Routes, Route, BrowserRouter, Link } from "react-router-dom"
import Publico from "../Publico"
import { Privado } from '../Privado'
import Login from "../Login"
import { AuthProvider } from '../../context/AuthProvider'
import { IndexPrivado } from '../IndexPrivado'



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
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
