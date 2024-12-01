export const api = 'http://localhost:3000/api/'

export const login = async (URL, parametros) => {
    
    const respuesta =  await fetch(api+URL,{
        method: 'POST',
        body: JSON.stringify(parametros),
        headers: {
            "Content-Type": "application/json"
        }

    })
    return respuesta;
}

export const permisos = async (URL) => {
    
    const respuesta =  await fetch(api+URL,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }

    })
    return respuesta;
}

export const crearUsuarios = async (URL, parametros) => {
    
    const respuesta =  await fetch(api+URL,{
        method: 'POST',
        body: JSON.stringify(parametros),
        headers: {
            "Content-Type": "application/json"
        }

    })
    return respuesta;
}


export const obtenerRoles = async (URL) => {
    
    const respuesta =  await fetch(api+URL,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }

    })
    return respuesta;
}

export const obtenerUsuarios = async (URL) => {
    
    const respuesta =  await fetch(api+URL,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }

    })
    return respuesta;
}

export const actualizarEstado = async (URL, parametros) => {
    
    const respuesta =  await fetch(api+URL,{
        method: 'PUT',
        body: JSON.stringify(parametros),
        headers: {
            "Content-Type": "application/json"
        }

    })
    return respuesta;
}


export const obtenerCursos = async (URL) => {
    
    const respuesta =  await fetch(api+URL,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }

    })
    return respuesta;
}
  

export const crearCursos = async (URL, parametros) => {
    
    const respuesta =  await fetch(api+URL,{
        method: 'POST',
        body: JSON.stringify(parametros),
        headers: {
            "Content-Type": "application/json"
        }

    })
    return respuesta;
}

export const actualizarEstadoCursos = async (URL, parametros) => {
    
    const respuesta =  await fetch(api+URL,{
        method: 'PUT',
        body: JSON.stringify(parametros),
        headers: {
            "Content-Type": "application/json"
        }

    })
    return respuesta;
}


export const asignarCurso = async (URL, parametros) => {
    
    const respuesta =  await fetch(api+URL,{
        method: 'POST',
        body: JSON.stringify(parametros),
        headers: {
            "Content-Type": "application/json"
        }

    })
    return respuesta;
}

export const actualizarEstadoAsignacion = async (URL, parametros) => {
    
    const respuesta =  await fetch(api+URL,{
        method: 'PUT',
        body: JSON.stringify(parametros),
        headers: {
            "Content-Type": "application/json"
        }

    })
    return respuesta;
}

export const obtenerAsignaciones = async (URL) => {
    
    const respuesta =  await fetch(api+URL,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }

    })
    return respuesta;
}