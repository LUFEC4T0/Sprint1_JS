const $divId = document.getElementById('div_movies');
const $inputBusquedaPeliculas = document.getElementById('inputBusquedaPeliculas');

const todasLasPeliculas = movies;

function cardMaker(movie) {
    return `<section class="flex flex-col items-center w-96 border rounded-3xl border-black text-center gap-3 p-3 bg-neutral-900">
        <img class="w-64 h-48 object-cover" src="${movie.image}" alt="Foto película">
        <h3 class="text-white font-bold text-2xl">${movie.title}</h3>
        <h2 class="text-white p-3">${movie.tagline}</h2>
        <p class="text-white">${movie.overview}</p>
        <a class="p-5 pb-2 pt-2 bg-white rounded-lg font-bold" href="./detalles.html?id=${movie.id}">Details</a>
    </section>`;
}

const $opciones = document.getElementById('opciones')

function filtrarPeliculasPorTitulo(peliculas, tituloIngresado) {
   return peliculas.filter((pelicula) => pelicula.title.toLowerCase().includes(tituloIngresado.toLowerCase()));
}

function renderizarPeliculas(peliculas) {
    $divId.innerHTML = peliculas.reduce((acumulador, movie) => (acumulador += cardMaker(movie)), '');
}

renderizarPeliculas(todasLasPeliculas)

function filtrarPeliculasPorGenero(peliculas, generoSeleccionado) {
    if (!generoSeleccionado) return peliculas;
    return peliculas.filter((pelicula) => pelicula.genres.includes(generoSeleccionado));
}

$inputBusquedaPeliculas.addEventListener('input', () => {
    const tituloIngresado = $inputBusquedaPeliculas.value;
    const peliculasFiltradasPorTitulo = filtrarPeliculasPorTitulo(todasLasPeliculas, tituloIngresado);
    const peliculasFiltradas = filtrarPeliculasPorGenero(peliculasFiltradasPorTitulo, $opciones.value);

    renderizarPeliculas(peliculasFiltradas);
});

$opciones.addEventListener('change', () => {
    const tituloIngresado = $inputBusquedaPeliculas.value;
    const peliculasFiltradasPorTitulo = filtrarPeliculasPorTitulo(todasLasPeliculas, tituloIngresado);
    const peliculasFiltradas = filtrarPeliculasPorGenero(peliculasFiltradasPorTitulo, $opciones.value);

    renderizarPeliculas(peliculasFiltradas);
});

$opciones.addEventListener('change', filtrarPeliculasPorGenero)








// function filtrarPeliculasPorTitulo(peliculas, tituloIngresado) {
//     return peliculas.filter((pelicula) => pelicula.title.toLowerCase().includes(tituloIngresado.toLowerCase()));
// }

// function renderizarPeliculas(peliculas) {
//     $divId.innerHTML = peliculas.reduce((acumulador, movie) => (acumulador += cardMaker(movie)), '');
// }

// renderizarPeliculas(todasLasPeliculas);

// $inputBusquedaPeliculas.addEventListener('input', () => {
//     const tituloIngresado = $inputBusquedaPeliculas.value;
//     const peliculasFiltradas = filtrarPeliculasPorTitulo(todasLasPeliculas, tituloIngresado);
//     const peliculasFiltradasPorGenero = 2;
//     // filtrarPeliculasPorGenero(peliculasFiltradas)

//     // renderizarPeliculas(peliculasFiltradasPorGenero);
    
// });

// const $opciones = document.getElementById('opciones')

// function filtrarPeliculasPorGenero() {
//     const peliculasFiltradas2 = $opciones.value
//     ? movies.filter(movie => movie.genres.includes($opciones.value))
//     : movies;

    
//     renderizarPeliculas(peliculasFiltradas2)
// }

//     $opciones.addEventListener('change', filtrarPeliculasPorGenero)