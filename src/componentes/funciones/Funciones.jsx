export const api = 'http://localhost:3000/api/'

export const post = async (URL, parametros) => {
    
    const respuesta =  await fetch(api+URL,{
        method: 'POST',
        body: JSON.stringify(parametros),
        headers: {
            "Content-Type": "application/json"
        }

    })
    return respuesta;
}

export const get = async (URL) => {
    
    const respuesta =  await fetch(api+URL,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }

    })
    return respuesta;
}


export const put = async (URL, parametros) => {
    
    const respuesta =  await fetch(api+URL,{
        method: 'PUT',
        body: JSON.stringify(parametros),
        headers: {
            "Content-Type": "application/json"
        }

    })
    return respuesta;
}






