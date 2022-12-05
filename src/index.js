function fetchMovies() {
    // To pass the tests, don't forget to return your fetch!
    fetch('http://localhost:3000/Movies')
    .then(response => response.json())
    .then(movieData => renderMovies(movieData));
  };

function fetchSeries() {
  // 
  fetch('http://localhost:3000/Series')
  .then(response => response.json())
  .then(seriesData => renderSeries(seriesData));
};

function fetchList() {
  // 
  fetch('http://localhost:3000/Home')
  .then(resp => resp.json())
  .then(seriesData => renderSeries(seriesData));
};

function renderList(list){
  const main = document.querySelector('main');
  list.forEach(list => {
    const h2 = document.createElement('h2');
    h2.innerHTML = list.name;
    main.appendChild(h2);
});
}

function renderList(movies) {
  const main = document.querySelector('main');
  movies.forEach(movie => {
    const h2 = document.createElement('h2');
    h2.innerHTML = movie.name;
    main.appendChild(h2);
  });
};

function renderMovies(movies) {
  const main = document.querySelector('main');
  list.forEach(list => {
    const h2 = document.createElement('h2');
    h2.innerHTML = list.name;
    main.appendChild(h2);
  });
};

function renderSeries(series) {
  const main = document.querySelector('main');
  series.forEach(series => {
    const h2 = document.createElement('h2');
    h2.innerHTML = series.name;
    main.appendChild(h2);
  });
};

const init = () => {
  const inputForm = document.querySelector('form')
  inputForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.querySelector('input#searchByID');
    fetch(`http://localhost:3000/movies/${input.value}`)
    .then(response => response.json())
    .then(data => {
      const title = document.querySelector('section#movieDetails h4');
      const summary = document.querySelector('section#movieDetails p');
      title.innerText = data.title;
      summary.innerText = data.summary;
      });
    });
  };
 
document.addEventListener('DOMContentLoaded', init);