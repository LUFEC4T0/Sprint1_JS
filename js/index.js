const url = 'https://moviestack.onrender.com/api/movies'
const apiKey = '0ff70d54-dc0b-4262-9c3d-776cb0f34dbd'
const init = {
    headers: {
        'x-api-key': apiKey
    }
}
export let movies = []

await fetch(url, init)
 .then(Response => Response.json())
 .then(data => movies =data.movies.map(movie =>{
    const { image, ... rest} = movie;
    return { image: "https://moviestack.onrender.com/static/"+image, ...rest}

}))
.catch(err => console.log(err))

const $divId = document.getElementById('div_movies');
const $inputBusquedaPeliculas = document.getElementById('inputBusquedaPeliculas');

const todasLasPeliculas = movies;

function cardMaker(movie) {
    return `<section class="flex flex-col items-center w-96 relative border rounded-3xl border-black text-center gap-3 p-3 bg-neutral-900">
    <button id="fav_${movie.id}" class="hover:text-white text-gray-500  hover:fill-red-600 absolute z-30 top-2 right-0 mt-2 mr-3">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 hover:fill-red-600 fill-gray-300">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
    </button>
        <img class="w-64 h-48 object-cover" src="${movie.image}" alt="Foto película">
        <h3 class="text-white font-bold text-2xl">${movie.title}</h3>
        <h2 class="text-white p-3">${movie.tagline}</h2>
        <p class="text-white line-clamp-3">${movie.overview}</p>
        <a class="p-5 pb-2 pt-2 bg-white rounded-lg font-bold" href="./detalles.html?id=${movie.id}">Details</a>
    </section>`;
}

const $opciones = document.getElementById('opciones')

function filtrarPeliculasPorTitulo(peliculas, tituloIngresado) {
   return peliculas.filter((pelicula) => pelicula.title.toLowerCase().includes(tituloIngresado.toLowerCase()));
}

function renderizarPeliculas(peliculas, contenedor) {
   contenedor.innerHTML = peliculas.reduce((acumulador, movie) => (acumulador += cardMaker(movie)), '');
}

if ($divId) {
    renderizarPeliculas(todasLasPeliculas, $divId)
}

function filtrarPeliculasPorGenero(peliculas, generoSeleccionado) {
    if (!generoSeleccionado) return peliculas;
    return peliculas.filter((pelicula) => pelicula.genres.includes(generoSeleccionado));
}

if ($inputBusquedaPeliculas) {
    $inputBusquedaPeliculas.addEventListener('input', () => {
        const tituloIngresado = $inputBusquedaPeliculas.value;
        const peliculasFiltradasPorTitulo = filtrarPeliculasPorTitulo(todasLasPeliculas, tituloIngresado);
        const peliculasFiltradas = filtrarPeliculasPorGenero(peliculasFiltradasPorTitulo, $opciones.value);
    
        renderizarPeliculas(peliculasFiltradas, $divId);
    });
}

if ($opciones) {
    $opciones.addEventListener('change', () => {
        const tituloIngresado = $inputBusquedaPeliculas.value;
        const peliculasFiltradasPorTitulo = filtrarPeliculasPorTitulo(todasLasPeliculas, tituloIngresado);
        const peliculasFiltradas = filtrarPeliculasPorGenero(peliculasFiltradasPorTitulo, $opciones.value);
    
        renderizarPeliculas(peliculasFiltradas, $divId);
    });
    $opciones.addEventListener('change', filtrarPeliculasPorGenero)
}

function manejarFavoritos() {
    const botonFavortios = document.querySelectorAll('[id^="fav_"]');
    const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
    let peliculasFavoritas = favoritosGuardados;
    
    const $divFavs = document.getElementById('div_favs');
    botonFavortios.forEach((btnFavs) => {
        btnFavs.addEventListener('click', (e) => {
            let id = btnFavs.id.replace("fav_", "");

            let buscarPeliculaFavorita = todasLasPeliculas.find((movie) => movie.id == id);
            const verificacionPelicula = peliculasFavoritas.some((favorito) => favorito.id == buscarPeliculaFavorita.id);

            if (verificacionPelicula) {
                peliculasFavoritas = peliculasFavoritas.filter((favorito) => favorito.id !== buscarPeliculaFavorita.id);
                console.log('Se elimino la pelicula de favoritos');
            } else {
                peliculasFavoritas.push(buscarPeliculaFavorita);
                console.log('Se agrego la pelicula a favoritos');
            }

            localStorage.setItem("favoritos", JSON.stringify(peliculasFavoritas));

            
        });

    });

    if ($divFavs) {
        renderizarPeliculas(peliculasFavoritas, $divFavs);
    }

    peliculasFavoritas.forEach((Mymovs) => {
        let btnFav = "fav_" + Mymovs.id;
        let btnsfav = document.getElementById(btnFav);

        const svgElement = btnsfav?.querySelector('svg');
        if (btnsfav && svgElement) {
            svgElement.classList.remove('hover:fill-red-600', 'fill-gray-300');
            svgElement.classList.add('hover:fill-gray-300', 'fill-red-600');
        }
    });
}


manejarFavoritos();







// const botonFavortios = document.querySelectorAll('[id^="fav_"]')
// const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos"))
// let peliculasFavoritas = []


// if (Array.isArray(favoritosGuardados)) {
//     peliculasFavoritas = favoritosGuardados
// }

// const $divFavs = document.getElementById('div_favs')

// botonFavortios.forEach((btnFavs) => {
//     btnFavs.addEventListener('click', (e) => {

//         let id = btnFavs.id.replace("fav_", "")

//         let buscarPeliculaFavorita = todasLasPeliculas.find((movie) => movie.id == id)
//         const verifacionPelicula = peliculasFavoritas.some((favorito) => favorito.id == buscarPeliculaFavorita.id)

//         if (verifacionPelicula) {
//             peliculasFavoritas = peliculasFavoritas.filter((favorito) => favorito.id !== buscarPeliculaFavorita.id)
//             console.log('Se elimino la pelicula de favoritos');
//         }else {
//             peliculasFavoritas.push(buscarPeliculaFavorita)
//             console.log('Se agrego la pelicula a favoritos');
//         }

//         localStorage.setItem("favoritos", JSON.stringify(peliculasFavoritas))
//     })
// })


// if ($divFavs) { 
//     renderizarPeliculas(peliculasFavoritas, $divFavs)
// }

// peliculasFavoritas.forEach((Mymovs) => {
//     let btnFav = "fav_" + Mymovs.id

//         let btnsfav = document.getElementById(btnFav)
//         console.log(btnsfav);

//         const svgElement = btnsfav.querySelector('svg');
//         if(btnsfav){
//             svgElement.classList.remove('hover:fill-red-600', 'fill-gray-300');
//             svgElement.classList.add('hover:fill-gray-300', 'fill-red-600');
//         }
// });
