import { fetchResponseSearch } from "./fetchResponse";


const query = document.querySelector("#searchbox");
const searchForm = document.querySelector(".search__form");
const injectionDiv = document.querySelector(".film-list");
const info = document.querySelector(".infoPlace");



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
                for (let i = 1; i < data.results.length; i++) {
                    injectionDiv.insertAdjacentHTML("beforeend", `<div class="single-film">
                <img class="film-image" src="https://image.tmdb.org/t/p/w500${data.results[i].poster_path}"
            alt="movie card">
        <div class="film-info">
            <p class="film-title">${data.results[i].original_title}</p>
            <div class="film-subinfo">
                <p>${data.results[i].release_date} W API nie ma gatunku</p>
                <p>${data.results[i].release_date}</p>
            </div>
        </div>
    </div>`)
                }
            }
        })
        .catch((error) => {
            injectionDiv.innerHTML = "";
            info.innerHTML = "";
            console.warn(error);
        })


})

