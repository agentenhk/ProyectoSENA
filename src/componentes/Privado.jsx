import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import useAuth from '../hooks/useAuth';
import { Navbar } from './utilidades/Navbar';
import { Footer } from './utilidades/Footer';

export const Privado = () => {
  const { seccion, cargando, auth } = useAuth();

  const user = {
    name: `Realiza tu gestión ${auth.nombre}  Perfil ${auth.nombre_rol}`,
    photo: "https://via.placeholder.com/40",
  };

  if (cargando) {
    return <div>..........</div>;
  }

  return (
    <>
      {seccion ? (
        <Box
          display="flex"
          flexDirection="column"
          minHeight="100vh"
        >
          {/* Navbar */}
          <Box component="header" sx={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: '#fff' }}>
            <Navbar user={user} />
          </Box>
          <br />
          <br />
          {/* Contenido principal */}
          <Box
            component="main"
            flex="1"
            sx={{
              padding: 3,
              mt: 8, // Ajusta el margen superior para evitar que el contenido sea tapado
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Outlet />
          </Box>
            <br />
            <br />
          {/* Footer */}
          <Box component="footer">
            <Footer />
          </Box>
        </Box>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};
