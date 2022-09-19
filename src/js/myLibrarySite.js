import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchResponseTrend, fetchResponseSearch, fetchResponseDetails, getGenreNames } from './fetchResponse';

const filmList = document.querySelector('.film-list');
const myLibrary = document.querySelector('a[href="/myLibrarySite.html"]');
const mainContainer = document.querySelector('.main_container');


myLibrary.addEventListener("click", (event) => {
   
    event.preventDefault();
    
    const clearfilmList = mainContainer.innerHTML = ``;

    mainContainer += clearfilmList;

    
})


