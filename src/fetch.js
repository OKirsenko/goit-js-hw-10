export default function fetchCountries(name) {
  return fetch(`${baseUrl}${name}?fields=name,capital,population,flags,languages`).then(response =>
    response.json(),
  );
}
const baseUrl = `https://restcountries.com/v3.1/name/`;
