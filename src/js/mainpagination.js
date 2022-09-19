import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import {
  fetchResponseTrend,
  fetchResponseSearch,
  fetchResponseDetails,
  getGenreNames,
} from './fetchResponse';

//======= PAGINATION / SEARCH =======//
const pagination = document.querySelector('.pagination__list');
const form = document.querySelector('.search__form');
const input = document.querySelector('input');
const filmList = document.querySelector('.film-list');
const info = document.querySelector('.infoPlace');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

prev.style.display = 'none';

let page = 1;

//======= MODAL =======//
const modalPicture = document.querySelector('.modal__img-picture');
const modalTitle = document.querySelector('.modal__head');
const modalRating = document.querySelector('.modal__rating');
const modalVotes = document.querySelector('.modal__votes-number');
const modalPopularity = document.querySelector('.modal__popularity-total');
const modalOriginalTitle = document.querySelector('.modal__title-original');
const modalGenre = document.querySelector('.modal__genre-description');
const modalDescription = document.querySelector('.modal__text');
const modalBtnWatched = document.querySelector('.modal__button-watched');
const modalBtnQueued = document.querySelector('.modal__button-queue');

let watchedFilmsStorage = [];
let queuedFilmsStorage = [];

function changePage(totalPages, page) {
  let liTag = '';
  let activeLi;
  let beforePages = page - 2;
  let afterPages = page + 2;
  pagination.innerHTML = '';

  if (totalPages < 7) {
    for (let i = 1; i <= totalPages; i++) {
      if (page === i) {
        activeLi = 'btn__active';
      } else {
        activeLi = '';
      }
      liTag += `<li class="num ${activeLi} pagination__item"><span>${i}</span></li>`;
    }
  } else {
    if (page > 2) {
      liTag += `<li class="num-first pagination__item"><span>1</span></li>`;
      if (page > 4) {
        liTag += `<li class="dots"><span>...</span></li>`;
      }
    }
    if (totalPages > 6) {
      if (page === totalPages) {
        beforePages = beforePages - 2;
      }
      if (page === totalPages - 1) {
        beforePages = beforePages - 1;
      }
      if (page === totalPages - 2) {
        beforePages = beforePages - 1;
        afterPages = afterPages - 1;
      }

      if (page === 1) {
        afterPages = afterPages + 2;
        beforePages = beforePages + 1;
      }
      if (page === 2) {
        afterPages = afterPages + 1;
      }
      if (page === 3) {
        afterPages = afterPages + 1;
        beforePages = beforePages + 1;
      }
    }

    for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
      if (pageLength > totalPages) {
        continue;
      }
      if (pageLength === 0) {
        pageLength++;
      }
      if (page === pageLength) {
        activeLi = 'btn__active';
      } else {
        activeLi = '';
      }
      liTag += `<li class="num ${activeLi} pagination__item"><span>${pageLength}</span></li>`;
    }

    if (page < totalPages - 1) {
      if (page < totalPages - 3) {
        liTag += `<li class="dots"><span>...</span></li>`;
      }
      liTag += `<li class="num-last pagination__item"><span>${totalPages}</span></li>`;
    }
  }

  pagination.innerHTML = liTag;
}

const ChangeFilmInfo = async film => {
  modalPicture.src = `https://image.tmdb.org/t/p/w400/${film.poster_path}`;
  modalTitle.innerHTML = `${film.title}`;
  modalRating.innerHTML = `${film.vote_average.toFixed(1)}`;
  modalVotes.innerHTML = `${film.vote_count}`;
  modalPopularity.innerHTML = `${film.popularity.toFixed(1)}`;
  modalOriginalTitle.innerHTML = `${film.original_title}`;
  modalGenre.innerHTML = `${film.genres.map(genre => genre.name).join(', ')}`;
  modalDescription.innerHTML = `${film.overview}`;
};

const addFilms = films => {
  const movies = films.results;
  const markup = movies
    .map(
      film =>
        `<div class="single-film" data-id="${film.id}" data-modal-open>
            <img class="film-image" src="https://image.tmdb.org/t/p/w400/${film.poster_path}"
                alt="${film.title}">
            <div class="film-info">
                <p class="film-title">${film.title}</p>
                <div class="film-subinfo">
                    <p class="film-genre">Gatunek filmowy</p>
                    <p>${film.release_date}</p>
                </div>
            </div>
        </div>`
    )
    .join('');
  filmList.innerHTML = markup;

  const filmArray = document.querySelectorAll('.single-film');
  filmArray.forEach(film => {
    film.addEventListener('click', async e => {
      e.preventDefault();
      const filmId = e.target.dataset.id;
      console.log(filmId);
      const filmData = await fetchResponseDetails(filmId);
      ChangeFilmInfo(filmData);

      modalBtnWatched.addEventListener('click', () => {
        watchedFilmsStorage.push({
          id: filmData.id,
          poster_path: filmData.poster_path,
          title: filmData.title,
          release_date: filmData.release_date,
          vote_average: filmData.vote_average,
          vote_count: filmData.vote_count,
          popularity: filmData.popularity,
          original_title: filmData.original_title,
          genres: filmData.genres,
          overview: filmData.overview,
        });
        const watch = 'id';
        const watchUniqueByKey = [
          ...new Map(
            watchedFilmsStorage.map(item => [item[watch], item])
          ).values(),
        ];

        localStorage.setItem('Watched films', JSON.stringify(watchUniqueByKey));
      });

      modalBtnQueued.addEventListener('click', () => {
        queuedFilmsStorage.push({
          id: filmData.id,
          poster_path: filmData.poster_path,
          title: filmData.title,
          release_date: filmData.release_date,
          vote_average: filmData.vote_average,
          vote_count: filmData.vote_count,
          popularity: filmData.popularity,
          original_title: filmData.original_title,
          genres: filmData.genres,
          overview: filmData.overview,
        });
        const queue = 'id';
        const queueUniqueByKey = [
          ...new Map(
            queuedFilmsStorage.map(item => [item[queue], item])
          ).values(),
        ];
        localStorage.setItem('Queued films', JSON.stringify(queueUniqueByKey));
      });
    });
  });

  (() => {
    const refs = {
      openModalBtn: document.querySelectorAll('[data-modal-open]'),
      closeModalBtn: document.querySelector('[data-modal-close]'),
      modal: document.querySelector('[data-modal]'),
    };
    refs.openModalBtn.forEach(open =>
      open.addEventListener('click', toggleModal)
    );

    function toggleModal() {
      refs.modal.classList.toggle('is-hidden');
    }
    if (!refs.modal.classList.contains('is-hidden')) {
      refs.closeModalBtn.addEventListener('click', () => {
        refs.modal.classList.add('is-hidden');
      });
      document.addEventListener('keydown', e => {
        if (e.key == 'Escape') {
          refs.modal.classList.add('is-hidden');
        }
      });
    }
  })();

  const filmGenre = document.querySelectorAll('.film-genre');
  const addGenres = async () => {
    const genreId = movies.map(film => film.genre_ids);
    for (let i = 0; i <= filmGenre.length; i++) {
      const add = await getGenreNames(genreId[i]);
      filmGenre[i].innerHTML = add;
    }
  };
  addGenres();
};

const scrollup = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

fetchResponseTrend(page).then(popularMovies => {
  addFilms(popularMovies);
  changePage(popularMovies.total_pages, page);

  pagination.addEventListener('click', async event => {
    if (isNaN(event.target.textContent)) return;
    else {
      page = Number(event.target.textContent);

      const nextPage = await fetchResponseTrend(page);
      scrollup();
      addFilms(nextPage);
      changePage(nextPage.total_pages, page);

      if (page == 1) prev.style.display = 'none';
      else prev.style.display = 'block';

      if (page == nextPage.total_pages) next.style.display = 'none';
      else next.style.display = 'block';
    }
  });

  if (page > 1) {
    prev.addEventListener('click', async () => {
      page = page - 1;
      const nextPage = await fetchResponseTrend(page);
      scrollup();
      addFilms(nextPage);
      changePage(nextPage.total_pages, page);
      if (page === 1) prev.style.display = 'none';
      next.style.display = 'block';
    });
  }

  next.addEventListener('click', async () => {
    page = page + 1;
    const nextPage = await fetchResponseTrend(page);
    scrollup();
    addFilms(nextPage);
    changePage(nextPage.total_pages, page);
    if (page === nextPage.total_pages) next.style.display = 'none';
    prev.style.display = 'block';
  });
});
pagination.removeEventListener('submit', {});
next.removeEventListener('submit', {});
prev.removeEventListener('submit', {});

form.addEventListener('submit', e => {
  let tipedInput = input.value.trim();
  e.preventDefault();
  page = 1;

  try {
    return fetchResponseSearch(tipedInput, page).then(movies => {
      if (movies.total_results === 0) {
        info.innerHTML =
          'Search result not successful. Enter the correct movie name and ';

        filmList.innerHTML = '';
        pagination.innerHTML = '';
        next.style.display = 'none';
        prev.style.display = 'none';
      }

      if (movies.total_results > 0) {
        info.innerHTML = '';
        addFilms(movies);
        changePage(movies.total_pages, page);

        pagination.addEventListener('click', async event => {
          if (isNaN(event.target.textContent)) return;
          else {
            page = Number(event.target.textContent);

            const nextPage = await fetchResponseSearch(tipedInput, page);
            scrollup();
            addFilms(nextPage);
            changePage(nextPage.total_pages, page);

            if (page == 1) prev.style.display = 'none';
            else prev.style.display = 'block';

            if (page == nextPage.total_pages) next.style.display = 'none';
            else next.style.display = 'block';
          }
        });

        if (page > 1) {
          prev.addEventListener('click', async () => {
            page = page - 1;
            const nextPage = await fetchResponseSearch(tipedInput, page);
            scrollup();
            addFilms(nextPage);
            changePage(nextPage.total_pages, page);
            if (page === 1) prev.style.display = 'none';
            next.style.display = 'block';
          });
        }

        next.addEventListener('click', async () => {
          page = page + 1;
          const nextPage = await fetchResponseSearch(tipedInput, page);
          scrollup();
          addFilms(nextPage);
          changePage(nextPage.total_pages, page);
          if (page === nextPage.total_pages) next.style.display = 'none';
          prev.style.display = 'block';
        });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
});
