function fetch() {
    // To pass the tests, don't forget to return your fetch!
    return fetch('')
    .then(resp => resp.json())
    .then(bookData => renderBooks(bookData));
  }
  
  function renderMovie(movies) {
    const main = document.querySelector('main');
    movies.forEach(book => {
      const h2 = document.createElement('h2');
      h2.innerHTML = book.name;
      main.appendChild(h2);
    });
  }

  function renderTvShow(tvShows) {
    const main = document.querySelector('main');
    tvShows.forEach(tvShow => {
      const h2 = document.createElement('h2');
      h2.innerHTML = tvShows.name;
      main.appendChild(h2);
    });
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    fetchMovie();
  });
  