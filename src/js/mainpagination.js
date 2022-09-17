import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import {
  fetchResponseTrend,
  fetchResponseSearch,
  fetchResponseDetails,
  getGenreNames,
} from './fetchResponse';

// const s = 1;

// export { s };

const pagination = document.querySelector('.pagination__list');
const form = document.querySelector('.search__form');
const input = document.querySelector('input');
const filmList = document.querySelector('.film-list');
const info = document.querySelector('.infoPlace');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let page = 1;

function changePage(totalPages, page) {
  let liTag = '';
  let activeLi;
  let beforePages = page - 1;
  let afterPages = page + 1;
  pagination.innerHTML = '';

  // if (page > 1) {
  //   liTag += `<li class="btn prev pagination__item" data-page=${
  //     page - 1
  //   }"><span>&#8592</span></li>`;
  // }

  if (page > 2) {
    liTag += `<li class="num-first pagination__item" data-page=1"><span>1</span></li>`;
    if (page > 3) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }

  if (page === totalPages) {
    beforePages = beforePages - 2;
  } else if (page === totalPages - 1) {
    beforePages = beforePages - 1;
  }

  if (page === 1) {
    afterPages = afterPages + 2;
  } else if (page === 2) {
    afterPages = afterPages + 1;
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
    liTag += `<li class="num ${activeLi} pagination__item" data-page=${pageLength}"><span>${pageLength}</span></li>`;
  }

  if (page < totalPages - 1) {
    if (page < totalPages - 3) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="num-last pagination__item" data-page=${totalPages}"><span>${totalPages}</span></li>`;
  }

  // if (page < totalPages) {
  //   liTag += `<li class="btn next pagination__item" data-page=${
  //     page + 1
  //   }"><span>&#8594</span></li>`;
  // }

  if (totalPages === 1) {
    liTag = `<li class="btn prev"><span>&#8592</span></li>
          <li class="num active"><span>1</span></li>
          <li class="btn next"><span>&#8594</span></li>`;
  }

  pagination.innerHTML = liTag;
}

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
      const filmData = await fetchResponseDetails(filmId);
      ChangeFilmInfo(filmData);

      modalBtnWatched.addEventListener('click', () => {
        localStorage.setItem('Wathced films', filmId);
        // refs.modal.classList.add('is-hidden');
      });

      modalBtnQueued.addEventListener('click', () => {
        localStorage.setItem('Queued films', filmId);
        // refs.modal.classList.add('is-hidden');
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
    refs.closeModalBtn.addEventListener('click', toggleModal);
    function toggleModal() {
      refs.modal.classList.toggle('is-hidden');
    }
    if (!refs.modal.classList.contains('is-hidden')) {
      document.addEventListener('keydown', e => {
        if (e.key == 'Escape') {
          refs.modal.classList.add('is-hidden');
        }
      });
    }
  })();

  // const filmGenre = document.querySelectorAll('.film-genre');

  // const addGenres = async () => {
  //   const genreId = movies.map(film => film.genre_ids);
  //   for (let i = 0; i <= filmGenre.length; i++) {
  //     const add = await getGenreNames(genreId[i]);
  //     filmGenre[i].innerHTML = add;
  //   }
  // };
  // addGenres();
};

// document.addEventListener('.pagination__item',async e => {
//   page = Number(e.target.dataset.page)
// });

fetchResponseTrend(page).then(popularMovies => {
  addFilms(popularMovies);
  changePage(popularMovies.total_pages, page);

  pagination.addEventListener('click', async event => {
    page = Number(event.target.textContent);
    // console.log(event.target.dataset.page);

    const nextPage = await fetchResponseTrend(page);

    addFilms(nextPage);
    changePage(nextPage.total_pages, page);
  });

  prevBtn.addEventListener('click', async () => {
    page = page - 1;
    const nextPage = await fetchResponseTrend(page);

    addFilms(nextPage);
    changePage(nextPage.total_pages, page);
  });

  nextBtn.addEventListener('click', async () => {
    page = page + 1;
    const nextPage = await fetchResponseTrend(page);

    addFilms(nextPage);
    changePage(nextPage.total_pages, page);
  });
});

pagination.removeEventListener('submit', {});

// form.addEventListener('submit', e => {
//   let tipedInput = input.value.trim();
//   e.preventDefault();
//   filmList.innerHTML = '';
//   pagination.innerHTML = '';

//   page = 1;
//   try {
//     // console.log(fetchResponseSearch(tipedInput, page));
//     return fetchResponseSearch(tipedInput, page).then(movies => {
//       if (movies.total_results === 0) {
//         info.innerHTML =
//           'Search result not successful. Enter the correct movie name and ';

//         filmList.innerHTML = '';
//         pagination.innerHTML = '';
//         // return fetchResponseTrend(page).then(films => {
//         //   addFilms(films);
//         //   changePage(films.total_pages, page);

//         //   pagination.addEventListener('click', async event => {
//         //     page = Number(event.target.textContent);

//         //     const nextPage = await fetchResponseTrend(page);

//         //     addFilms(nextPage);
//         //     changePage(nextPage.total_pages, page);
//         //   });
//         //   pagination.removeEventListener('submit', {});
//         // });
//       }

//       if (movies.total_results > 0) {
//         info.innerHTML = '';
//         addFilms(movies);
//         changePage(movies.total_pages, page);

//         pagination.addEventListener('click', async event => {
//           page = Number(event.target.textContent);

//           const nextMovie = await fetchResponseSearch(tipedInput, page);
//           addFilms(nextMovie);
//           changePage(nextMovie.total_pages, page);
//         });
//         pagination.removeEventListener('submit', {});
//       }
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// });
