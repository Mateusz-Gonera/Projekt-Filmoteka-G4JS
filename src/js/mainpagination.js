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
// const paginationItem = document.querySelectorAll('.pagination__item');

let page = 1;


function changePage(totalPages, page) {
  let liTag = '';
  let activeLi;
  let beforePages = page - 1;
  let afterPages = page + 1;
  pagination.innerHTML = '';

  if (page > 1) {
    liTag += `<li class="btn prev pagination__item" data-page=${
      page - 1
    }"><span>&#8592</span></li>`;
  }

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
      activeLi = 'active';
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

  if (page < totalPages) {
    liTag += `<li class="btn next pagination__item" data-page=${
      page + 1
    }"><span>&#8594</span></li>`;
  }

  if (totalPages === 1) {
    liTag = `<li class="btn prev"><span>&#8592</span></li>
          <li class="num active"><span>1</span></li>
          <li class="btn next"><span>&#8594</span></li>`;
  }

  pagination.innerHTML = liTag;
}


const addFilms = films => {
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


// document.addEventListener('.pagination__item',async e => {
//   page = Number(e.target.dataset.page)
// });
// console.log(page)

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
