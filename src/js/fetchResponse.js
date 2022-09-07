const API_KEY = '';

const fetchResponse = async (search, pagenr) => {
  const response = await fetch(
    ``
  );
  const movies = await response.json();
  return movies;
};

export { fetchResponse };