import { fetchResponseSearch, getGenreNames } from "./fetchResponse";


const query = document.querySelector("#searchbox");
const searchForm = document.querySelector(".search__form");
const injectionDiv = document.querySelector(".film-list");
const info = document.querySelector(".infoPlace");

console.log(getGenreNames([12]));

const adding = async (dataFromAPI) => {
    for (let i = 1; i < dataFromAPI.results.length; i++) {
        const genre = await getGenreNames(dataFromAPI.results[i].genre_ids);
        await console.log(genre);
        await injectionDiv.insertAdjacentHTML("beforeend",
            `<div class="single-film">
                <img class="film-image" src="https://image.tmdb.org/t/p/w500${dataFromAPI.results[i].poster_path}" alt="movie card">
                <div class="film-info">
                    <p class="film-title">${dataFromAPI.results[i].original_title}</p>
                    <div class="film-subinfo">
                        <p>${genre}</p>
                        <p>${dataFromAPI.results[i].release_date}</p>
                    </div>
                </div>
            </div>`)
    }
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(fetchResponseSearch(query.value, 1));
    fetchResponseSearch(query.value, 1)
        .then(data => {
            injectionDiv.innerHTML = "";
            if (data.results.length == 0) {
                info.innerHTML = "Search result not successful. Enter the correct movie name and ";
            }
            else {
                info.innerHTML = "";
                adding(data);
            }
        })
        .catch((error) => {
            injectionDiv.innerHTML = "";
            info.innerHTML = "";
            console.warn(error);
        })


})

