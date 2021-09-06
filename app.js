const API_KEY = "25210924b2f5041e4ce23097c2cadaea";
const TRENDING_URL = `https://api.themoviedb.org/3/trending/movies/day?api_key=${API_KEY}`;

const moviesContainer = document.querySelector(".movies__container");

const searchInput = document.querySelector("#search");

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

const template = document.getElementById("template");

searchInput.addEventListener("change", (e) => {
  const query = e.target.value;
  fetchSearchMovie(query);
});

async function fetchTrendingMovies() {
  const response = await fetch(TRENDING_URL);
  const data = await response.json();
  movieDisplay(data.results);
}

async function fetchSearchMovie(query) {
  const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=25210924b2f5041e4ce23097c2cadaea&query=${query}`;
  const response = await fetch(SEARCH_URL);
  const data = await response.json();
  movieDisplay(data.results);
}

function fetchGenre(id) {
  return genres.find((x) => x.id === id) !== undefined
    ? genres.find((x) => x.id === id).name
    : "Unknown";
}

function movieDisplay(movies) {
  moviesContainer.innerHTML = "";
  movies.map((movie) => {
    let movieName = movie.name || movie.original_title;
    let posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    let rating = movie.vote_average;
    let genreId = fetchGenre(movie.genre_ids[0]);
    // ===============================================
    const templateClone = template.content.cloneNode(true);
    const imageEl = templateClone.querySelector(".movie__poster");
    const ratingEl = templateClone.querySelector(".rating-count");
    const nameEl = templateClone.querySelector(".movie__name");
    const genreEl = templateClone.querySelector(".movie__genre");
    // ===============================================

    imageEl.src = posterPath;
    ratingEl.textContent = rating;
    nameEl.textContent = movieName;
    genreEl.textContent = genreId;
    moviesContainer.appendChild(templateClone);
  });
}

fetchTrendingMovies();
