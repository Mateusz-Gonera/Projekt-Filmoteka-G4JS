import Notiflix from 'notiflix';
import {
  fetchResponseTrend,
  fetchResponseSearch,
  fetchResponseDetails,
  getGenreNames,
} from './fetchResponse';

const pagination = document.querySelector('.pagination__list');
const filmList = document.querySelector('.film-list');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const watchedButton = document.querySelector('#watchedButton');
const queueButton = document.querySelector('#queueButton');

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
const modal = document.querySelector('.backdrop');

filmList.innerHTML = '';
pagination.innerHTML = '';
next.style.display = 'none';
prev.style.display = 'none';

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
        liTag += `<li class="dots pagination__item"><span>...</span></li>`;
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
        liTag += `<li class="dots pagination__item"><span>...</span></li>`;
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
  modalBtnWatched.dataset.id = film.id;
  modalBtnQueued.dataset.id = film.id;
};

const addFilms = movies => {
  const markup = movies
    .map(
      film =>
        `<div class="single-film" data-id="${film.id}" data-modal-open>
            <img class="film-image" src="https://image.tmdb.org/t/p/w400/${
              film.poster_path
            }"
                alt="${film.title}">
            <div class="film-info">
                <p class="film-title">${film.title}</p>
                <div class="film-subinfo">
                    <p class="film-genre">${film.genres
                      .map(genre => genre.name)
                      .join(', ')}</p>
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
      modalPicture.src = '';
      modalTitle.innerHTML = '';
      modalRating.innerHTML = '';
      modalVotes.innerHTML = '';
      modalPopularity.innerHTML = '';
      modalOriginalTitle.innerHTML = '';
      modalGenre.innerHTML = '';
      modalDescription.innerHTML = '';
      modalBtnWatched.dataset.id = '';
      modalBtnQueued.dataset.id = '';

      e.preventDefault();
      const filmId = film.dataset.id;
      const filmData = await fetchResponseDetails(filmId);
      ChangeFilmInfo(filmData);
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

    refs.closeModalBtn.addEventListener('click', () => {
      refs.modal.classList.add('is-hidden');
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        refs.modal.classList.add('is-hidden');
      }
    });
  })();
};

if (!localStorage.getItem('Watched')) {
  localStorage.setItem('Watched', '[]');
}
if (!localStorage.getItem('Queued')) {
  localStorage.setItem('Queued', '[]');
}

let watchedStorage = JSON.parse(localStorage.getItem('Watched'));
let queueStorage = JSON.parse(localStorage.getItem('Queued'));

modalBtnWatched.addEventListener('click', async () => {
  modal.classList.add('is-hidden');
  const filmId = modalBtnWatched.dataset.id;
  const filmData = await fetchResponseDetails(filmId);
  Notiflix.Notify.success(`"${filmData.title}" successfully added to your WATCHED list`);
  let clickedFilm = {
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
  };
  if (watchedStorage.length === 0) {
    watchedStorage.push(clickedFilm);
  } else {
    let checkForMatch = watchedStorage.find(added => added.id === filmData.id);
    if (checkForMatch === undefined) {
      watchedStorage.push(clickedFilm);
    }
  }
  localStorage.setItem('Watched', JSON.stringify(watchedStorage));
});

modalBtnQueued.addEventListener('click', async () => {
  modal.classList.add('is-hidden');
  const filmId = modalBtnQueued.dataset.id;
  const filmData = await fetchResponseDetails(filmId);
  Notiflix.Notify.success(`"${filmData.title}" successfully added to your QUEUE list`);
  let clickedFilm = {
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
  };
  if (queueStorage.length === 0) {
    queueStorage.push(clickedFilm);
  } else {
    let checkForMatch = queueStorage.find(added => added.id === filmData.id);
    if (checkForMatch === undefined) {
      queueStorage.push(clickedFilm);
    }
  }
  localStorage.setItem('Queued', JSON.stringify(queueStorage));
});

const scrollup = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

const divideResultToPages = (array, page) => {
  page = page - 1;
  return array.slice(0 + 21 * page, 20 + 21 * page);
};

const firstEntry = () => {
  if (watchedStorage === null) {
    filmList.innerHTML = '';
    pagination.innerHTML = '';
    next.style.display = 'none';
    prev.style.display = 'none';
    return;
  }
  addFilms(divideResultToPages(watchedStorage, page));
  changePage(Math.ceil(watchedStorage.length / 20), page);

  pagination.addEventListener('click', event => {
    if (isNaN(event.target.textContent)) return;
    else {
      page = Number(event.target.textContent);

      const nextPage = divideResultToPages(watchedStorage, page);
      scrollup();
      addFilms(nextPage);
      changePage(Math.ceil(watchedStorage.length / 20), page);

      if (page == 1) prev.style.display = 'none';
      else prev.style.display = 'flex';

      if (page == nextPage.total_pages) next.style.display = 'none';
      else next.style.display = 'flex';
    }
  });

  if (page > 1) {
    prev.addEventListener('click', () => {
      page = page - 1;
      const nextPage = divideResultToPages(watchedStorage, page);
      scrollup();
      addFilms(nextPage);
      changePage(Math.ceil(watchedStorage.length / 20), page);
      if (page === 1) prev.style.display = 'none';
      next.style.display = 'flex';
    });
  }

  next.addEventListener('click', () => {
    page = page + 1;
    const nextPage = divideResultToPages(watchedStorage, page);
    scrollup();
    addFilms(nextPage);
    changePage(Math.ceil(watchedStorage.length / 20), page);
    if (page === nextPage.total_pages) next.style.display = 'none';
    prev.style.display = 'flex';
  });
};

firstEntry();

queueButton.addEventListener('click', e => {
  e.preventDefault;
  page = 1;
  if (queueStorage === null) {
    filmList.innerHTML = '';
    pagination.innerHTML = '';
    next.style.display = 'none';
    prev.style.display = 'none';
    watchedButton.classList.remove('current-page');
    queueButton.classList.add('current-page');
    return;
  }
  addFilms(divideResultToPages(queueStorage, page));
  changePage(Math.ceil(queueStorage.length / 20), page);
  watchedButton.classList.remove('current-page');
  queueButton.classList.add('current-page');

  pagination.addEventListener('click', event => {
    if (isNaN(event.target.textContent)) return;
    else {
      page = Number(event.target.textContent);

      const nextPage = divideResultToPages(queueStorage, page);
      scrollup();
      addFilms(nextPage);
      changePage(Math.ceil(queueStorage.length / 20), page);

      if (page == 1) prev.style.display = 'none';
      else prev.style.display = 'flex';

      if (page == nextPage.total_pages) next.style.display = 'none';
      else next.style.display = 'flex';
    }
  });

  if (page > 1) {
    prev.addEventListener('click', () => {
      page = page - 1;
      const nextPage = divideResultToPages(queueStorage, page);
      scrollup();
      addFilms(nextPage);
      changePage(Math.ceil(queueStorage.length / 20), page);
      if (page === 1) prev.style.display = 'none';
      next.style.display = 'flex';
    });
  }

  next.addEventListener('click', () => {
    page = page + 1;
    const nextPage = divideResultToPages(queueStorage, page);
    scrollup();
    addFilms(nextPage);
    changePage(Math.ceil(queueStorage.length / 20), page);
    if (page === nextPage.total_pages) next.style.display = 'none';
    prev.style.display = 'flex';
  });
});

watchedButton.addEventListener('click', e => {
  e.preventDefault;
  page = 1;
  if (watchedStorage === null) {
    filmList.innerHTML = '';
    pagination.innerHTML = '';
    next.style.display = 'none';
    prev.style.display = 'none';
    watchedButton.classList.add('current-page');
    queueButton.classList.remove('current-page');
    return;
  }
  addFilms(divideResultToPages(watchedStorage, page));
  changePage(Math.ceil(watchedStorage.length / 20), page);
  watchedButton.classList.add('current-page');
  queueButton.classList.remove('current-page');

  pagination.addEventListener('click', event => {
    if (isNaN(event.target.textContent)) return;
    else {
      page = Number(event.target.textContent);

      const nextPage = divideResultToPages(watchedStorage, page);
      scrollup();
      addFilms(nextPage);
      changePage(Math.ceil(watchedStorage.length / 20), page);

      if (page == 1) prev.style.display = 'none';
      else prev.style.display = 'flex';

      if (page == nextPage.total_pages) next.style.display = 'none';
      else next.style.display = 'flex';
    }
  });

  if (page > 1) {
    prev.addEventListener('click', () => {
      page = page - 1;
      const nextPage = divideResultToPages(watchedStorage, page);
      scrollup();
      addFilms(nextPage);
      changePage(Math.ceil(watchedStorage.length / 20), page);
      if (page === 1) prev.style.display = 'none';
      next.style.display = 'flex';
    });
  }

  next.addEventListener('click', () => {
    page = page + 1;
    const nextPage = divideResultToPages(watchedStorage, page);
    scrollup();
    addFilms(nextPage);
    changePage(Math.ceil(watchedStorage.length / 20), page);
    if (page === nextPage.total_pages) next.style.display = 'none';
    prev.style.display = 'flex';
  });
});
