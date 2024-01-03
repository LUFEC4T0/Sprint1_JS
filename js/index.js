const $divId = document.getElementById('div_movies')

function cardMaker(movies) {
    return `<section class="flex flex-col items-center w-96 border rounded-3xl border-black text-center gap-3 p-3 bg-neutral-900">
    <img class="w-64 h-48 object-cover" src="${movies.image}" alt="Foto pelicula">
    <h3 class="text-white font-bold text-2xl">${movies.title}</h3>
    <h2 class="text-white p-3">${movies.tagline}</h2>
    <p class="text-white">${movies.overview}</p>
</section>`
}

$divId.innerHTML += movies.reduce(
    (acumulador, movie) => (acumulador += cardMaker(movie)),
    " "
)
