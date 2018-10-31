export function showFilms(films) {
  let root = document.getElementById("films-container");
  root.innerHTML = '';
  films.forEach(element => { addFilmElementToRoot(element, root); });
}

function calculateColor(rating) {
  if(rating >= 7) return "film__rating_excelent";
  else if (rating >= 4) return "film__rating_good";
  else return "film__rating_bad";
}

function addFilmElementToRoot (element, root) {
  let img = document.createElement('img');
  img.setAttribute('src', element.picture);
  img.setAttribute('alt', element.title + " постер");

  let imgLink = document.createElement('a');
  imgLink.className = "film__poster-link";
  imgLink.appendChild(img);

  let filmPoster = document.createElement('div');
  filmPoster.className = "film__poster";
  filmPoster.appendChild(imgLink);

  let filmTitle = document.createElement('a');
  filmTitle.innerHTML = element.title;
  filmTitle.className = "film__title";

  let filmYear = document.createElement('div');
  filmYear.innerHTML = element.date.toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
  });
  filmYear.className = "film__date";

  let filmRating = document.createElement('div');
  filmRating.innerHTML = "" + element.rating + "/10";
  filmRating.className = "film__rating " + calculateColor(element.rating);

  let filmRow = document.createElement('div');
  filmRow.className = "film";
  filmRow.appendChild(filmPoster);

  filmRow.appendChild(filmPoster);
  filmRow.appendChild(filmTitle);
  filmRow.appendChild(filmYear);
  filmRow.appendChild(filmRating);
  root.appendChild(filmRow);
};