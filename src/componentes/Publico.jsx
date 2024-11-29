import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'


export const Publico = () => {
  const { seccion, cargando } = useAuth();
  console.log(cargando,seccion)
  if (cargando) {
    return (
      <div>..........</div>
    )
  } else {
    return (
      <>
        {!seccion ?
          <>
            <section>
              <Outlet />
            </section>
          </>
          :
          <Navigate to="/panel" />
        }
      </>
    )
  }
}
