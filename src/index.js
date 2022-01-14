import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './fetch';

Notiflix.Notify.init({
  width: '350px',
  fontSize: '24px',
  distance: '30px',
  clickToClose: true,
});

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  if (inputEl.value.length === 0) {
    countryInfoEl.innerHTML = '';
    countryListEl.innerHTML = '';
    return;
  }
  fetchCountries(inputEl.value.trim()).then(addingToList);
}

function addingToList(countries) {
  if (countries.length === 1) {
    oneCoountryMarkUp(countries);
  } else if (countries.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countries.status === 404) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
  } else {
    manyCountriesMarkUp(countries);
  }
}

function oneCoountryMarkUp(country) {
  const markup = country.map(country => {
    // console.log(country);
    return `<div class="country-card">
    <img src="${country.flags.svg}" class="main-img"> 
    <h1>${country.name.official}</h1>
    <ul class="char-list">
    <li class="char-item">Capital:  ${country.capital}</li>
    <li class="char-item">Population: ${country.population}</li>
    <li class="char-item">Languages: ${Object.values(country.languages)}</li>
    </ul></div>`;
  });
  countryInfoEl.innerHTML = markup;
  countryListEl.innerHTML = '';
}

function manyCountriesMarkUp(countries) {
  const markup = countries.map(
    country =>
      `<li class="countries-list"><img src="${country.flags.svg}" class="list-images">${country.name.official}</li>`,
  );

  countryListEl.innerHTML = markup;
  countryInfoEl.innerHTML = '';
}
