import './css/styles.css';
import fetchCountries from './partials/fetchCountries';
import Notiflix from 'notiflix';

refs = {
  input: document.querySelector('input#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const { input, countryList, countryInfo } = refs;

const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');

input.addEventListener('input', debounce(onSearchForm, DEBOUNCE_DELAY));

function onSearchForm(e) {
  const searchQuery = e.target.value.trim(); // ========== метод trim()

  //   console.log(name);
  if (searchQuery === '') {
    // ======================================= нет запроса на путую строку
    return;
  }
  fetchCountries(searchQuery)
    .then(country => {
      renderCountriesList(country);
    })
    .catch(error => {
      console.log(error);
    });
}

function renderCountriesList(countries) {
  const markup = countries
    .map(country => {
      return `<li class="country-list__item"><img src=${
        country.flags.svg
      } alt="Flag of country" width="40">
          <p><b>Name</b>: ${country.name.official}</p>
          <p><b>Capital </b>: ${country.capital}</p>
          <p><b>Population</b>: ${country.population}</p>
          <p><b>Languages</b>: ${Object.values(country.languages)}</p></li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

{
  /* <ul class="country-list"></ul>
    <div class="country-info"></div> */
}

// copypasta
// ukraine

// Notiflix.Notify.failure("Oops, there is no country with that name");
// Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
