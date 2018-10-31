import { loadFilms } from './load.js';
import { initFilterForm } from './form.js';
import { showFilms } from './display.js';

var data = {
    films: [],
}

function compareDates(a, b) {
    if (a < b) return 1;
    else if (a == b) return 0;
    else return -1;
  }
  
  function compareNumbers(a, b) {
    if (a < b) return 1;
    else if (a == b) return 0;
    else return -1;
  }

function setUpFilters (filterForm) {

    const applySameTimeFilters = () => {
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

window.onload = function () {
    data.films = loadFilms();
    let filterForm = initFilterForm();
    setUpFilters(filterForm);
    showFilms(data.films);
}