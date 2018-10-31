var data = {
    films: [],
}

function loadFilms(loadTo) {
    loadTo.films = 
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
}

showFilms = (films) => {
    let root = document.getElementById("films-container");
    root.innerHTML = '';
    films.forEach(element => { addFilmElementToRoot(element, root); });
}

addFilmElementToRoot = (element, root) => {
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

calculateColor = (rating) => {
    if(rating >= 7) return "film__rating_excelent";
    else if (rating >= 4) return "film__rating_good";
    else return "film__rating_bad";
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

setUpFilters = (filterForm) => {

    applySameTimeFilters = () => {
        let filmListToDisplay = data.films;
        
        if (filterForm.inputs.title.value !== '') {
            filmListToDisplay = filmListToDisplay.filter(film => film.title.toLowerCase().startsWith(filterForm.inputs.title.value.toLowerCase()));
        }
        
        if (filterForm.inputs.category.value.toLowerCase() !== 'все') {
            filmListToDisplay = filmListToDisplay.filter(film => film.categories.map(e => e.toLowerCase()).includes(filterForm.inputs.category.value.toLowerCase()));
        }
    
        switch (filterForm.inputs.sort.value) {
            case 'title': {
                filmListToDisplay = filmListToDisplay.sort((a, b) => a.title.localeCompare(b.title))
                break;
            }
            case 'latest': {
                filmListToDisplay = filmListToDisplay.sort((a,b) => compareDates(a.date, b.date));
                break;
            }
            case 'best': {
                filmListToDisplay = filmListToDisplay.sort((a,b) => compareNumbers(a.rating, b.rating));
                break;
            }
        }
    
        filmListToDisplay = filmListToDisplay.filter(film => film.rating >= filterForm.inputs.rating.value);
    
        if (filterForm.inputs.yearFrom.value !== '' && filterForm.inputs.yearFrom.value.match(/^[\d]{4}$/i)) {
            filmListToDisplay = filmListToDisplay.filter(film => film.date.getFullYear() >= filterForm.inputs.yearFrom.value);
        }
    
        if (filterForm.inputs.yearUntil.value !== '' && filterForm.inputs.yearUntil.value.match(/^[\d]{4}$/i)) {
            filmListToDisplay = filmListToDisplay.filter(film => film.date.getFullYear() <= filterForm.inputs.yearUntil.value);
        }
        
        showFilms(filmListToDisplay);
    }

    filterForm.inputs.title.addEventListener('keyup', applySameTimeFilters);
    filterForm.inputs.category.addEventListener('change', applySameTimeFilters);
    filterForm.inputs.sort.addEventListener('input', applySameTimeFilters);
    filterForm.inputs.rating.addEventListener('input', applySameTimeFilters);
    filterForm.inputs.yearFrom.addEventListener('keyup', applySameTimeFilters);
    filterForm.inputs.yearUntil.addEventListener('keyup', applySameTimeFilters);
}

function initFilterForm() {
    let filterForm = {
        inputs : {},
    };

    filterForm.inputs.title = document.getElementById('title-filter');
    filterForm.inputs.category = document.getElementById('category-filter');
    filterForm.inputs.sort = document.getElementById('sort-by');
    filterForm.inputs.rating = document.getElementById("rating-filter");
    displaySliderValue(filterForm.inputs.rating, document.getElementById('rating-value'))
    filterForm.inputs.yearUntil = document.getElementById("year-until-filter");
    setUpDateValidation('keyup', filterForm.inputs.yearUntil);
    filterForm.inputs.yearFrom = document.getElementById("year-from-filter");
    setUpDateValidation('keyup', filterForm.inputs.yearFrom);

    return filterForm;
}

function displaySliderValue(slider, valueBlock) {
    slider.addEventListener('input', event => {
        valueBlock.innerHTML = event.target.value;
    });
}

function setUpDateValidation(type, input) {
    input.addEventListener(type, event => {
        if (event.target.value !== '' && !event.target.value.match(/^[\d]{4}$/i)) input.classList.add('filter-item__input_not-valid');
        else  input.classList.remove('filter-item__input_not-valid');
    });
}

window.onload = function () {
    loadFilms(data);
    filterForm = initFilterForm();
    setUpFilters(filterForm);
    showFilms(data.films);
}