const API_KEY = "25210924b2f5041e4ce23097c2cadaea";

async function getId() {
  const movieId = await localStorage.getItem("MOVIE_ID");
  getMovie(movieId);
}

async function getMovie(id) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
  );
  const { title, tagline, release_date, overview, revenue } =
    await response.json();
}

getId();
