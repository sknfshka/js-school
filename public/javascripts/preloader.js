import { loadFilms } from './load.js';
import { initFilterForm, setUpFilters } from './form.js';
import { showFilms } from './display.js';

var data = {
    films: [],
}

window.onload = function () {
    data.films = loadFilms();
    let filterForm = initFilterForm();
    setUpFilters(filterForm, data);
    showFilms(data.films);
}