// const init = () => {
//   const inputForm = document.querySelector('form')
//   inputForm.addEventListener('submit', (event) => {
//   event.preventDefault();
//   const input = document.querySelector('input#myInput');
//     fetch(`http://localhost:3000/`)
//     .then(response => response.json())
//     .then(data => {
//       const title = document.querySelector('h1');
//       const summary = document.querySelector('');
//       title.innerText = data.title;
//       summary.innerText = data.summary;
//       });
//     });
//   };
 
// document.addEventListener('DOMContentLoaded', init);

//Sorting by starting alphanumeric character
function sortByStartingCharacter(textInput){
  if (textInput.startsWith() in capitalLetters || numbers){
    
  }
}

const buildSortOptionsToolBar = () => {
  //
  capitalLetters = [A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z];
  sortOptionsIcons = ["All",...capitalLetters,"#","Movies","Series","Dark Mode","Light Mode"]
  alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  numbers = ['0','1','2','3','4','5','6','7','8','9']
  for (let option of sortOptionsIcons ){
    const sortOptions = document.querySelector("div#sortOptions");
    sortOptionsElement = sortOptions.createElement('a');
    sortOptionsElement.setAttribute('class', 'topBarUnclicked');
    sortOptionsElement.setAttribute('href', '#');
    sortOptionsElement.setAttribute('textContent',`${option}`);
    document.addEventListener("click", )
};
  
};

function fetchMovies() {
    // 
  fetch('http://localhost:3000/Movies')
  .then(response => response.json())
  .then(movieData => renderMovies(movieData));
  };

  function renderMovies(movies) {
    const main = document.querySelector('div#mainPage');
    movies.forEach(list => {
      const h2 = document.createElement('h2');
      h2.innerHTML = list.name;
      main.appendChild(h2);
    });
  };

function fetchSeries() {
  // 
  fetch('http://localhost:3000/Series')
  .then(response => response.json())
  .then(seriesData => renderSeries(seriesData));
};

function renderSeries(series) {
  const main = document.querySelector('div#mainPage');
  series.forEach(series => {
    const h2 = document.createElement('h2');
    h2.innerHTML = series.name;
    main.appendChild(h2);
  });
};

function fetchList() {
  // 
  fetch('http://localhost:3000/')
  .then(resp => resp.json())
  .then(seriesData => renderSeries(seriesData));
};

function renderList(list){
  const main = document.querySelector('div#mainPage');
  list.forEach(list => {
    const h2 = document.createElement('h2');
    h2.innerHTML = list.name;
    main.appendChild(h2);
});
}

