const API_KEY = '18cc3ec683925dedb66d3e6092890eaa';

const fetchResponseTrend = async pagenr => {
  const responseTrend = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${pagenr}`
  );
  if (!responseTrend.ok) throw new Error();
  const moviesTrend = await responseTrend.json();
  return moviesTrend;
};

const fetchResponseSearch = async (search, pagenr) => {
  const responseSearch = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pl-PL&query=${search}&page=${pagenr}&include_adult=false`
  );
  if (!responseSearch.ok) throw new Error();
  const moviesSearch = await responseSearch.json();
  return moviesSearch;
};

const fetchResponseDetails = async movieID => {
  const responseDetails = await fetch(
    `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=pl-PL`
  );
  if (!responseDetails.ok) throw new Error();
  const moviesDetails = await responseDetails.json();
  return moviesDetails;
};

export { fetchResponseTrend, fetchResponseSearch, fetchResponseDetails };
