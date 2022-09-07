const API_KEY = '18cc3ec683925dedb66d3e6092890eaa';

const fetchResponse = async (search, pagenr) => {
  const response = await fetch(
    ``
  );
  const movies = await response.json();
  return movies;
};

export { fetchResponse };