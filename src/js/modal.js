

// const modalPicture = document.querySelector('.modal__img-picture');
// const modalTitle = document.querySelector('.modal__head');
// const modalRating = document.querySelector('.modal__rating');
// const modalVotes = document.querySelector('.modal__votes-number');
// const modalPopularity = document.querySelector('.modal__popularity-total');
// const modalOriginalTitle = document.querySelector('.modal__title-original');
// const modalGenre = document.querySelector('.modal__genre-description');
// const modalDescription = document.querySelector('.modal__text');
// const modalBtnWatched = document.querySelector('.modal__button-watched');
// const modalBtnQueued = document.querySelector('.modal__button-queue');

// const ChangeFilmInfo = async film => {
//   modalPicture.src = `https://image.tmdb.org/t/p/w400/${film.poster_path}`;
//   modalTitle.innerHTML = `${film.title}`;
//   modalRating.innerHTML = `${film.vote_average.toFixed(1)}`;
//   modalVotes.innerHTML = `${film.vote_count}`;
//   modalPopularity.innerHTML = `${film.popularity.toFixed(1)}`;
//   modalOriginalTitle.innerHTML = `${film.original_title}`;
//   modalGenre.innerHTML = `${film.genres.map(genre => genre.name).join(', ')}`;
//   modalDescription.innerHTML = `${film.overview}`;
// };

// const addFilms = films => {
//   const movies = films.results;
//   const markup = movies
//     .map(
//       film =>
//         `<div class="single-film" data-id="${film.id}" data-modal-open>
//             <img class="film-image" src="https://image.tmdb.org/t/p/w400/${film.poster_path}"
//                 alt="${film.title}">
//             <div class="film-info">
//                 <p class="film-title">${film.title}</p>
//                 <div class="film-subinfo">
//                     <p class="film-genre">Gatunek filmowy</p>
//                     <p>${film.release_date}</p>
//                 </div>
//             </div>
//         </div>`
//     )
//     .join('');
//   filmList.innerHTML = markup;

//   const filmArray = document.querySelectorAll('.single-film');
//   filmArray.forEach(film => {
//     film.addEventListener('click', async e => {
//       e.preventDefault();
//       const filmId = e.target.dataset.id;
//       console.log(filmId)
//       const filmData = await fetchResponseDetails(filmId);
//       ChangeFilmInfo(filmData);

//       modalBtnWatched.addEventListener('click', () => {
//         localStorage.setItem('Wathced films', filmId);
//       });

//       modalBtnQueued.addEventListener('click', () => {
//         localStorage.setItem('Queued films', filmId);
//       });
//     });
//   });

//   (() => {
//     const refs = {
//       openModalBtn: document.querySelectorAll('[data-modal-open]'),
//       closeModalBtn: document.querySelector('[data-modal-close]'),
//       modal: document.querySelector('[data-modal]'),
//     };
//     refs.openModalBtn.forEach(open =>
//       open.addEventListener('click', toggleModal)
//     );
//     refs.closeModalBtn.addEventListener('click', toggleModal);
//     function toggleModal() {
//       refs.modal.classList.toggle('is-hidden');
//     }
//     if (!refs.modal.classList.contains('is-hidden')) {
//       document.addEventListener('keydown', e => {
//         if (e.key == 'Escape') {
//           refs.modal.classList.add('is-hidden');
//         }
//       });
//     }
//   })();

//   // const filmGenre = document.querySelectorAll('.film-genre');

//   // const addGenres = async () => {
//   //   const genreId = movies.map(film => film.genre_ids);
//   //   for (let i = 0; i <= filmGenre.length; i++) {
//   //     const add = await getGenreNames(genreId[i]);
//   //     filmGenre[i].innerHTML = add;
//   //   }
//   // };
//   // addGenres();
// };