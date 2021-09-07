const API_KEY = "25210924b2f5041e4ce23097c2cadaea";
const template = document.querySelector("#movie-template");
const container = document.querySelector(".movie-container");

async function getId() {
  const movieId = await localStorage.getItem("MOVIE_ID");
  getMovie(movieId);
}

async function getMovie(id) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
  );

  let {
    title,
    tagline,
    release_date,
    overview,
    revenue,
    poster_path,
    runtime,
  } = await response.json();

  // ==============================
  const templateClone = template.content.cloneNode(true);
  const imgEl = templateClone.querySelector(".single_movie_poster");
  const titleEl = templateClone.querySelector(".movie-title");
  const taglineEl = templateClone.querySelector(".tagline");
  const rdateEl = templateClone.querySelector(".rdate");
  const durationEl = templateClone.querySelector(".duration");
  const revenueEl = templateClone.querySelector(".revenue");
  const overviewEl = templateClone.querySelector(".overview");

  //================================
  imgEl.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
  titleEl.innerHTML = `Title: ${title}`;
  if (tagline === "") {
    tagline = "Not Available";
  }
  taglineEl.innerHTML = `<span>Tagline:</span> ${tagline}`;
  rdateEl.innerHTML = `<span>Released:</span> ${release_date}`;
  overviewEl.innerHTML = `<span>Overview:</span> ${overview}`;
  if (revenue < 1) {
    revenue = "Not Available";
  } else {
    revenue = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(revenue);
  }
  revenueEl.innerHTML = `<span>Revenue:</span> ${revenue}`;
  durationEl.innerHTML = `<span>Duration:</span> ${runtime} minutes`;
  container.appendChild(templateClone);
}

getId();
