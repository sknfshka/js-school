var script = document.createElement('script');
script.src = "/javascripts/jquery.js";
document.body.appendChild(script);

var data = {
    films: [],

    loadAllFilms: () => {},
}

function afterLoad() {
    var scripts = ['/javascripts/jquery.js'];
    scripts.forEach(function(src) {
        var script = document.createElement('script');
        script.src = src;
        document.head.appendChild(script);
    });
}

script.onload = script.onerror = function() {
    if (!this.executed) {
        this.executed = true;
        afterLoad();
    }
};

script.onreadystatechange = function() {
    var self = this;
    if (this.readyState == "complete" || this.readyState == "loaded") {
        setTimeout(function() {
            self.onload()
        }, 0); // save this
    }
};

showFilms = (films) => {
    let root = document.getElementById("films-container");
    root.innerHTML = '';

    addFilmElementToRoot = (element) => {

        let img = document.createElement('img');
        img.setAttribute('src', element.picture);
        img.setAttribute('alt', element.title + " постер");

        let imgLink = document.createElement('a');
        imgLink.className = "poster-link";
        imgLink.appendChild(img);

        let filmPoster = document.createElement('div');
        filmPoster.className = "film-poster";
        filmPoster.appendChild(imgLink);

        let filmTitle = document.createElement('a');
        filmTitle.innerHTML = element.title;
        filmTitle.className = "film-title";

        let filmYear = document.createElement('div');
        filmYear.innerHTML = element.date.toLocaleString('ru', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        filmYear.className = "film-year";

        let filmRating = document.createElement('div');
        filmRating.innerHTML = "" + element.rating + "/10";
        filmRating.className = "film-rating " + calculateColor(element.rating);

        let filmRow = document.createElement('div');
        filmRow.className = "film-row";
        filmRow.appendChild(filmPoster);

        filmRow.appendChild(filmPoster);
        filmRow.appendChild(filmTitle);
        filmRow.appendChild(filmYear);
        filmRow.appendChild(filmRating);
        root.appendChild(filmRow);
    };

    films.forEach(element => { addFilmElementToRoot(element); });
}

calculateColor = (rating) => {
    if(rating >= 7) return "excelent";
    else if (rating >= 4) return "good";
    else return "bad";
}

compareDates = (a, b) => {
    if (a < b) return 1;
    else if (a == b) return 0;
    else return -1;
}

compareNumbers = (a, b) => {
    if (a < b) return 1;
    else if (a == b) return 0;
    else return -1;
}

applySameTimeFilters = () => {
    let toDisplay = data.films;
    let titleFilter = document.getElementById('title-filter');
    if (titleFilter.value !== '') {
        toDisplay = toDisplay.filter(film => film.title.toLowerCase().startsWith(titleFilter.value.toLowerCase()));
    }
    
    let categoryFilter = document.getElementById('category-filter');
    if (categoryFilter.value.toLowerCase() !== 'все') {
        toDisplay = toDisplay.filter(film => film.categories.map(e => e.toLowerCase()).includes(categoryFilter.value.toLowerCase()));
    }

    let sortBy = document.getElementById('sort-by');
    switch (sortBy.value) {
        case 'title': {
            toDisplay = toDisplay.sort((a, b) => a.title.localeCompare(b.title))
            break;
        }
        case 'latest': {
            toDisplay = toDisplay.sort((a,b) => compareDates(a.date, b.date));
            break;
        }
        case 'best': {
            toDisplay = toDisplay.sort((a,b) => compareNumbers(a.rating, b.rating));
            break;
        }
    }

    let ratingFilter = document.getElementById("rating-filter");
    toDisplay = toDisplay.filter(film => film.rating >= ratingFilter.value);

    let yearFromFilter = document.getElementById("year-from-filter");
    if (yearFromFilter.value !== '' && yearFromFilter.value.match(/^[\d]{4}$/i)) {
        toDisplay = toDisplay.filter(film => film.date.getFullYear() >= yearFromFilter.value);
    }

    let yearUntilFilter = document.getElementById("year-until-filter");
    if (yearUntilFilter.value !== '' && yearUntilFilter.value.match(/^[\d]{4}$/i)) {
        toDisplay = toDisplay.filter(film => film.date.getFullYear() <= yearUntilFilter.value);
    }
    
    showFilms(toDisplay);
}

setUpFilters = () => {
    let titleFilter = document.getElementById('title-filter');
    titleFilter.onkeyup = applySameTimeFilters;

    let categoryFilter = document.getElementById('category-filter');
    categoryFilter.onchange = applySameTimeFilters;

    let sortBy = document.getElementById('sort-by');
    sortBy.onchange = applySameTimeFilters;

    let ratingFilter = document.getElementById("rating-filter");
    ratingFilter.oninput = (event) => {
        let ratingValue = document.getElementById('rating-value');
        ratingValue.innerHTML = event.target.value;
        applySameTimeFilters();
    }

    
    let yearFromFilter = document.getElementById("year-from-filter");
    yearFromFilter.onkeyup = (event) => {
        if (event.target.value !== '' && !event.target.value.match(/^[\d]{4}$/i)) yearFromFilter.classList.add('not-valid');
        else  yearFromFilter.classList.remove('not-valid');
        applySameTimeFilters();
    }
    
    let yearUntilFilter = document.getElementById("year-until-filter");
    yearUntilFilter.onkeyup = (event) => {
        if (event.target.value !== '' && !event.target.value.match(/^[\d]{4}$/i)) yearUntilFilter.classList.add('not-valid');
        else  yearUntilFilter.classList.remove('not-valid');
        applySameTimeFilters();
    }
}

window.onload = function () {
    data.loadAllFilms = () => {
        data.films = 
        [
            {
                id: "1",
                title: "Аанго освобожденный",
                date: new Date(2012, 11, 2),
                rating: 5,
                picture: "/images/iphone360_586397.jpg",
                categories: ["Комедия","Боевик"]
            },
            {
                id: "2",
                title: "Asd",
                date: new Date(2014, 11, 2),
                rating: 8.3,
                picture: "/images/iphone360_586397.jpg",
                categories: ["Комедия"]
            },
            {
                id: "3",
                title: "фыв",
                date: new Date(2015, 11, 2),
                rating: 10,
                picture: "/images/iphone360_586397.jpg",
                categories: ["Комедия","Боевик"]
            },
            {
                id: "4",
                title: "Джанго освобожденный",
                date: new Date(2013, 11, 2),
                rating: 2,
                picture: "/images/iphone360_586397.jpg",
                categories: ["Комедия","Боевик"]
            },
            {
                id: "4",
                title: "Джанго освобожденный",
                date: new Date(2013, 11, 2),
                rating: 2,
                picture: "/images/iphone360_586397.jpg",
                categories: ["Комедия","Боевик"]
            },
            {
                id: "4",
                title: "Джанго освобожденный",
                date: new Date(2013, 11, 2),
                rating: 2,
                picture: "/images/iphone360_586397.jpg",
                categories: ["Комедия","Боевик"]
            },
            {
                id: "4",
                title: "Джанго освобожденный",
                date: new Date(2013, 11, 2),
                rating: 2,
                picture: "/images/iphone360_586397.jpg",
                categories: ["Комедия","Боевик"]
            }
        ];
        
        console.log("Data loaded: ", data.films);
    }

    data.loadAllFilms();
    applySameTimeFilters();

    setUpFilters();
}