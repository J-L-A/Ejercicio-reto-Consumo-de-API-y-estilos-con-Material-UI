// Este va a realizar la petición a la API y va a devolver los datos de los posts

import React from 'react'

function PostsServiceDummy() {
  return (
    <div>
      PostsService
    </div>
  )
}

async function ObtenerPosts(page = 1, limit = 10) {
    let url = '';
    
    if (page && limit) {
        url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`;
    }
    else {
        url = 'https://jsonplaceholder.typicode.com/posts';
    }

    try {
        const resultado = await fetch(url);
        if (!resultado.ok) {
          throw new Error("Problemas al mostrar los datos");
        }           
        const datosJson = await resultado.json();
        return datosJson;     // Muy importante devolver los datos para que puedan ser utilizados en el componente que llama a esta función    
    }
    catch (err) {
        console.error(err.message);
    }
}

export default ObtenerPosts;