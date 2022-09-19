import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchResponseTrend, fetchResponseSearch, fetchResponseDetails, getGenreNames } from './fetchResponse';

const filmList = document.querySelector('.film-list');
// const myLibrary = document.querySelector('a[href="/myLibrarySite.html"]');
const mainContainer = document.querySelector('.main__container-library');
const watchedBtn = document.querySelector('.myLibrary__button');

mainContainer.innerHTML = '';





