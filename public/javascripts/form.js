export function initFilterForm() {
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