import './css/styles.css';
import fetchCountries from './partials/fetchCountries';
import Notiflix from 'notiflix';

refs = {
  input: document.querySelector('input#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const { input, countryList, countryInfo } = refs;
console.log(refs);

const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');

input.addEventListener('input', debounce(onSearchForm, DEBOUNCE_DELAY));

function onSearchForm(e) {
  const searchQuery = e.target.value.trim(); // ========== метод trim()
  clearCountryInfo();
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
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  } else if (countries.length === 0) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
  } else if (countries.length > 2 && countries.length < 10) {
    const markup = countries
      .map(country => {
        return `<div class="country-box"><img src=${country.flags.svg} alt="Flag of country" width="40">
          <p><b>${country.name.common}</b></p></div>`;
      })
      .join('');
    countryList.innerHTML = markup;
  } else if (countries.length === 1) {
    clearCountryInfo();
    const markup = countries
      .map(country => {
        return `<li><div class="country-box"><img src=${
          country.flags.svg
        } alt="Flag of country" width="40">
          <h1><b>${country.name.common}</b></h1></div>
          <p><b>Official name </b>: ${country.name.official}</p>
          <p><b>Capital </b>: ${country.capital}</p>
          <p><b>Population</b>: ${country.population}</p>
          <p><b>Languages</b>: ${Object.values(country.languages)}</p></li>`;
      })
      .join('');
    countryInfo.innerHTML = markup;
  }
}

function clearCountryInfo() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

// Notiflix.Notify.failure("Oops, there is no country with that name");
// Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
