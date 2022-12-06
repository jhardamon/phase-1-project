const init = () => {
  fetch(`http://localhost:3000`)
  .then(response => response.json())
  .then(data => {
  //  buildSortOptionsToolBar();
    fetchAll();
     });
  };
document.addEventListener('DOMContentLoaded', init);



//Sorting by starting alphanumeric character

// function sortByStartingCharacter(textInput){  
//   textInput.filter("",
//   () => (if (character in numbers){

//   }

//   else if (character in capitalLetters){
//     character = character.toLowerCase();


//   }

//   else{

//     };))

// }



function buildSortOptionsToolBar() {
  //Multi-use reference Variables
  const capitalLetters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  const wordsAndPhrases = ["#","All","Movies","Series","Dark Mode","Light Mode"]
  const sortOptionsIcons = [...capitalLetters,...wordsAndPhrases]
  const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  const numbers = ['0','1','2','3','4','5','6','7','8','9'];
  const alphanumeric = [...alphabet, ...numbers];
  const sortOptions = document.querySelector("div#sortOptions");

  const buildSearchBar = () => {
    const searchBarForm = document.createElement("form");
    searchBarForm.setAttribute('name','Search');
    
    const searchInput = document.createElement("input");
    searchBarForm.appendChild(searchInput);
    searchInput.setAttribute('name','Search');
    searchInput.setAttribute('type','TEXT')
    searchInput.setAttribute('value','Search')
    sortOptions.appendChild(searchBarForm);
    ;}

  for (let option of sortOptionsIcons ){
    sortOptionsElement = document.createElement('a');
    sortOptionsElement.setAttribute('class', 'topBarUnclicked');
    sortOptionsElement.setAttribute('href', '#');
    sortOptionsElement.setAttribute('textContent',`${option}`);
    
    document.addEventListener("click", (event) => {
      event.preventDefault();
      event.setAttribute("class","topBarClicked")
      if (option in wordsAndPhrases){

      } 
      else if (option in capitalLetters)
         sortByStartingCharacter(option);
    }
  )
};
buildSearchBar();

};
//Referenced for page manipulation
const item = document.querySelector("div#item");
const mainPageForList = document.querySelector("div#mainPage");

//GET requests and list creation
function fetchMovies() {
  fetch('http://localhost:3000/all')
  .then(response => response.json())
  .then(data => renderMovies(data))
  .catch(error => console.log(error));
  };

function renderMovies(list) {
  list.movies.forEach(movie => {

    const div = document.createElement('div');
    div.setAttribute('class','item')

    const h2 = document.createElement('h1');
    h2.innerHTML = movie.name;

    const img = document.createElement('img');
    img.setAttribute('class','mainPhotos');
    img.setAttribute('src',`src/photos/moviePhotos/${movie.name}.jpg`);

    const p = document.createElement('p');
    p.setAttribute('value',`${movie.description}\n Director:${movie.director} \n Genre(s):${movie.genres} \n Ranking:${movie.ranking} \n Year Released:${movie["Year Released"]}`);
    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(p)
  });
};
//
function fetchSeries() {
  fetch('http://localhost:3000/all')
  .then(response => response.json())
  .then(data => renderSeries(data))
  .catch(error => console.log(error));
  };

function renderSeries(list) {
  list.series.forEach(series => {

    const div = document.createElement('div');
    div.setAttribute('class','item')

    const h2 = document.createElement('h1');
    h2.innerHTML = series.name;

    const img = document.createElement('img');
    img.setAttribute('class','mainPhotos');
    console.log(series.image);
    img.setAttribute('src',`src/photos/seriesPhotos/${series.name}.jpg`)
    const p = document.createElement('p');
    p.setAttribute('value',`${series.description}\n Director:${series.director} \n Genre(s):${series.genres} \n Ranking:${series.ranking} \n Seasons info:${series["seasons"]}`);
    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(p)
  });
};
//Fetch all
function fetchAll() {
  fetch('http://localhost:3000/all/')
  .then(response => response.json())
  .then(data => renderAll(data))
  .catch(error => console.log(error));
  };

function renderAll(data) {
  const movieObject = data.all.movies;
  const seriesObject = data.all.series;

  renderMovies(movieObject);
  renderSeries(seriesObject);
}
//Update requests

//Patch requests