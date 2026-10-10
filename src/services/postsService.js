// Este va a realizar la petición a la API y va a devolver los datos de los posts

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Funcion para escapar caracteres especiales en la búsqueda, evitando errores en la URL y en la API.
function escaparTexto(texto) {
    return texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// page y limit se envían como _page y _limit; busqueda filtra por título en toda la API.
async function ObtenerPosts(page = 1, limit = 10, busqueda = "") {
    const parametros = new URLSearchParams({ _page: page, _limit: limit });

    if (busqueda.trim()) {
        parametros.set('title_like', escaparTexto(busqueda.trim()));
    }

    const url = `${API_URL}?${parametros}`;

    try {
        const resultado = await fetch(url);
        if (!resultado.ok){
          throw new Error("Problemas al mostrar los datos");
        }
        const datosJson = await resultado.json();
        // La API informa en este encabezado cuántos posts cumplen el filtro (sirve para paginar)
        const total = Number(resultado.headers.get('x-total-count')) || datosJson.length;
        return { datos: datosJson, total };     //Muy importante devolver los datos para que puedan ser utilizados en el componente que llama a esta función
      }
      catch (err){
        console.error(err.message);
        return null;
      }
}


export default ObtenerPosts