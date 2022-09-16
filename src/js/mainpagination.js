import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import {
  fetchResponseTrend,
  fetchResponseSearch,
  fetchResponseDetails,
  getGenreNames,
} from './fetchResponse';

const pagination = document.querySelector('.pagination__list');
const form = document.querySelector('.search__form');
const input = document.querySelector('input');
const filmList = document.querySelector('.film-list');
const info = document.querySelector('.infoPlace');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

prev.style.display = 'none';

let page = 1;

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
    if (totalPages > 5) {
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

const addFilms = films => {
  filmList.innerHTML = '';
  const movies = films.results;
  const markup = movies
    .map(
      film =>
        `<div class="single-film">
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

            addFilms(nextPage);
            changePage(nextPage.total_pages, page);

            if (page == 1) prev.style.display = 'none';
            else prev.style.display = 'block';

            if (page == nextPage.total_pages) next.style.display = 'none';
            else next.style.display = 'block';
          }
        });

        prev.addEventListener('click', async () => {
          if (page > 1) {
            page = page - 1;
            const nextPage = await fetchResponseSearch(tipedInput, page);
            addFilms(nextPage);
            changePage(nextPage.total_pages, page);
            if (page === 1) prev.style.display = 'none';
            next.style.display = 'block';
          }
        });

        next.addEventListener('click', async () => {
          page = page + 1;
          const nextPage = await fetchResponseSearch(tipedInput, page);
          lastPage = nextPage.total_pages;
          addFilms(nextPage);
          changePage(nextPage.total_pages, page);
          if (page === nextPage.total_pages) next.style.display = 'none';
          prev.style.display = 'block';
        });
      }
      pagination.removeEventListener('submit', {});
      next.removeEventListener('submit', {});
      prev.removeEventListener('submit', {});
    });
  } catch (error) {
    console.log(error.message);
  }
});


fetchResponseTrend(page).then(popularMovies => {
  addFilms(popularMovies);
  changePage(popularMovies.total_pages, page);

  pagination.addEventListener('click', async event => {
    if (isNaN(event.target.textContent)) return;
    else {
      page = Number(event.target.textContent);

      const nextPage = await fetchResponseTrend(page);

      addFilms(nextPage);
      changePage(nextPage.total_pages, page);

      if (page == 1) prev.style.display = 'none';
      else prev.style.display = 'block';

      if (page == nextPage.total_pages) next.style.display = 'none';
      else next.style.display = 'block';
    }
  });

  prev.addEventListener('click', async () => {
    if (page > 1) {
      page = page - 1;
      const nextPage = await fetchResponseTrend(page);
      addFilms(nextPage);
      changePage(nextPage.total_pages, page);
      if (page === 1) prev.style.display = 'none';
      next.style.display = 'block';
    }
  });

  next.addEventListener('click', async () => {
    page = page + 1;
    const nextPage = await fetchResponseTrend(page);
    lastPage = nextPage.total_pages;
    addFilms(nextPage);
    changePage(nextPage.total_pages, page);
    if (page === nextPage.total_pages) next.style.display = 'none';
    prev.style.display = 'block';
  });
  pagination.removeEventListener('submit', {});
  next.removeEventListener('submit', {});
  prev.removeEventListener('submit', {});
});