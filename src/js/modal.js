import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchResponseTrend, fetchResponseSearch, fetchResponseDetails, getGenreNames } from './fetchResponse';

(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };
  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);
  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
  }
    refs.closeModalBtn.addEventListener('keydown', function(e) {
    if(e.keyCode === 27){
      e.preventDefault()
    }})}
)();

let fetchResponseDetails = async movieID  => {

let  catchMovieOriginal = {
  photo: '',
  title: '',
  votesTotal: '',
  votes: '',
  popularity: '',
  orginalTitle: '',
  genres: '',
  about: '',
  id: '',
}

function renderMovie(movieId) {
  clearModal();
  fetchMovieData(movieId).then(res => {
    let data = res;
    catchMovieOriginal.photo = data.poster_path;
    catchMovieOriginal.title = data.title;
    catchMovieOriginal.votesAvarage = data.vote_average;
    catchMovieOriginal.votes = data.vote_count;
    catchMovieOriginal.popularity = data.popularity;
    catchMovieOriginal.orginalTitle = data.original_title;
    const genresArray = data.genres;
    let genres = genresArray.map(genresArray => genresArray.name);
    catchMovieOriginal.genres = genres.toString();
    catchMovieOriginal.about = data.overview;
    catchMovieOriginal.id = data.id;

    document
    .querySelector('.modal__img')
    .insertAdjacentHTML(
      'afterbegin',
      `<img class="modal__img-picture" src="https://image.tmdb.org/t/p/original${movieData.photo}" alt="photo" />`,
    );
  document
    .querySelector('.modal__head')
    .insertAdjacentHTML('afterbegin', `${movieData.title}`);
  document.querySelector('.modal__rating').insertAdjacentHTML('afterbegin', `${movieData.votesAvarage}`);
  document.querySelector('.modal__votes-number').insertAdjacentHTML('afterbegin', `${movieData.votes}`);
  document
    .querySelector('.modal__popularity')
    .insertAdjacentHTML('afterbegin', `${movieData.popularity}`);
  document
    .querySelector('.modal__title-original')
    .insertAdjacentHTML('afterbegin', `${movieData.orginalTitle}`);
  document.querySelector('.genre').insertAdjacentHTML('afterbegin', `${movieData.genres}`);
  document.querySelector('.modal__about').insertAdjacentHTML('afterbegin', `${movieData.about}`);
});

function realAboutFilm(id) {
  clearModal();
}

function clearModal(){
  document.querySelector('.modal__img-picture').innerHTML = '';
  document.querySelector('.modal__head').innerHTML = '';
  document.querySelector('.modal__rating').innerHTML = '';
  document.querySelector('.modal__votes-number').innerHTML = '';
  document.querySelector('.modal__popularity-total').innerHTML = '';
  document.querySelector('.modal__title').innerHTML = '';
  document.querySelector('.modal__genre-description').innerHTML = '';
  document.querySelector('.modal__about').innerHTML = '';
}
}}