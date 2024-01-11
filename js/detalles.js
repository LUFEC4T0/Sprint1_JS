const queryParams = new URLSearchParams(location.search) 
const id = queryParams.get('id')
const movie = movies.find(movie => movie.id == id)
const $divDetalles = document.getElementById('divDetalles')

$divDetalles.innerHTML = `
<div class="flex flex-col items-center w-2/5 pb-5">
    <img class="pb-5" src="${movie.image}" alt="Imagen de la pelicula">
    <table class="border-collapse border w-11/12">
        <tr>
            <th class="border-4 border-black text-start p-1 text-white">Original Lenguage</th>
            <td class="border-4 border-black p-1 text-white">${movie.original_language}</td>
        </tr>
        <tr>
            <th class="border-4 border-black text-start p-1 text-white">Relealse Date</th>
            <td class="border-4 border-black p-1 text-white">${movie.release_date}</td>
        </tr>
        <tr>
            <th class="border-4 border-black text-start p-1 text-white">Runtime</th>
            <td class="border-4 border-black p-1 text-white">${movie.runtime} mins</td>
        </tr>
        <tr>
            <th class="border-4 border-black text-start p-1 text-white">Status</th>
            <td class="border-4 border-black p-1 text-white">${movie.status}</td>
        </tr>
    </table>
</div>
<div class="w-3/5">
    <div class="pb-5">
        <h1 class="text-white font-bold text-2xl">${movie.title}</h1>
        <h2 class="text-white pb-3 font-bold">${movie.tagline}</h2>
        <h3 class="pb-3 text-white">Genres: ${movie.genres}</h3>
        <p class="text-white">${movie.overview}</p>
    </div>
    <table class="w-4/5">
        <tr>
            <th class="border-4 border-black p-1 text-start text-white">Vote Average</th>
            <td class="border-4 border-black p-1 text-white">${movie.vote_average} %</td>
        </tr>
        <tr>
            <th class="border-4 border-black p-1 text-start text-white">Budget</th>
            <td class="border-4 border-black p-1 text-white">USD ${movie.budget}</td>
        </tr>
        <tr>
            <th class="border-4 border-black p-1 text-start text-white">Revenue</th>
            <td class="border-4 border-black p-1 text-white">USD ${movie.revenue}</td>
        </tr>
    </table>
</div>`

