const init = () => {
  pageCreation()
  buildSortOptionsToolBar();
  fetchAll();
     };

document.addEventListener('DOMContentLoaded', init);

function pageCreation(){

const title = document.querySelector('title');
title.setAttribute('value','searchTube');

const body = document.querySelector('body');

const divWebPage = document.createElement('div');
divWebPage.setAttribute('id','webPage');

const divSortOptions = document.createElement('div');
divSortOptions.setAttribute('id','sortOptions');

const divWebTitle = document.createElement('div');
const h1WebTitle = document.createElement('h1');

divWebTitle.setAttribute('class', 'websiteName');
h1WebTitle.setAttribute('textContent','searchTube');

const divList = document.createElement('div');
divList.setAttribute('id','list');

divWebPage.appendChild(divSortOptions);
divWebPage.appendChild(divWebTitle);
divWebPage.appendChild(divList);

divWebTitle.appendChild(h1WebTitle);
body.appendChild(divWebPage);

} 
//Sorting alphabetically
function sortAlphabetically(array){
  array.sort(function (a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });
};

function buildSortOptionsToolBar() {
  //Multi-use reference Variables
  const capitalLetters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  const wordsAndPhrases = ["#","All","Movies","Series","Dark Mode","Light Mode"]
  const sortOptionsIcons = [...capitalLetters,...wordsAndPhrases]
  const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  const numbers = ['0','1','2','3','4','5','6','7','8','9'];
  const alphanumeric = [...alphabet, ...numbers];
  const sortOptions = document.querySelector("div#sortOptions");


//Sort by= starting character
function sortByStartingCharacter(textInput){  
  character = textInput.startsWith();

  if (character in numbers){

  }

  else if (character in capitalLetters){
    character = character.toLowerCase();


  }

  else{
    console.log('Input must be alphanumeric.')
    };

}

function buildSearchBar(){
  let searchBarForm = document.createElement("form");
  searchBarForm.setAttribute('id', 'searchBar');
  searchBarForm.setAttribute('action','http://localhost:3000/all')
  searchBarForm.setAttribute('method','GET');

  let searchInput = document.createElement("input");
  
  searchInput.setAttribute('name', 'searchBar');
  searchInput.setAttribute('id','searchBar');
  searchInput.setAttribute('type', 'TEXT');
  searchInput.setAttribute('value', 'Search');

  let button = document.createElement("button");
  button.textContent ='Search';

  searchBarForm.appendChild(searchInput);
  searchBarForm.appendChild(button);
  sortOptions.appendChild(searchBarForm);

}

function handleSearchBar() {
    form = document.querySelector('form');
    form.addEventListener('submit',(event) =>{
    event.preventDefault();
    //console.log(event.target.searchBar.value);
    form.reset();
    })}
    
function searchEngine(){

}

function buildSortIcons(){
  for (let option of sortOptionsIcons ){
    let a = document.createElement('a');
    a.setAttribute('id',`${option}`);
    a.setAttribute('class', 'topBarUnclicked');
    a.setAttribute('href', '#');
    a.textContent = `${option}`;
    const sortOptions = document.querySelector('div#sortOptions' )
    sortOptions.appendChild(a);
    document.addEventListener("click", (event) => {
      event.preventDefault();
      console.log(document.querySelector(`a#${option}`));
    });
  };
};

function handleSortIcons(){
  let findIcons = document.querySelector('a');
  let sortIcons = findIcons.parentElement.childNodes;
  let icons = [...sortIcons].pop();
  for (option in icons){
    document.addEventListener("click", (event) => {
      //console.log(event);
      event.preventDefault();
    })
  };
  

  
};


buildSortIcons();
handleSortIcons();
buildSearchBar();
handleSearchBar();
};

//GET requests and list creation
function fetchMovies() {
  fetch('http://localhost:3000/all')
  .then(response => response.json())
  .then(data => renderMovies(data))
  .catch(error => console.log(error));
  };

function renderMovies(list) {
  list.movies.forEach(movie => {

    const li = document.createElement('li');
    li.setAttribute('class','item');

    const ul = document.createElement('ul');
    ul.setAttribute('class','list');

    const h1 = document.createElement('h1');
    h1.textContent = `${movie.name}`;

    const img = document.createElement('img');
    img.setAttribute('class','mainPhotos');
    img.setAttribute('src',`src/photos/moviePhotos/${movie.name}.jpg`);

    const p = document.createElement('p');
    p.textContent =`Description: ${movie.description}`;
    const p1 = document.createElement('p');
    p1.textContent = `Director: ${movie.director}`;
    const p2 = document.createElement('p');
    p2.textContent = `Genre(s): ${movie.genres}`; 
    const p3 = document.createElement('p');
    p3.textContent = `Movie Ranking: ${movie.ranking}`;
    const p4 = document.createElement('p');
    p4.textContent = `Year Released: ${movie["Year Released"]}`;

    let div = document.querySelector('div#list');
    
    li.appendChild(ul)
    ul.appendChild(h1);
    ul.appendChild(img);
    ul.appendChild(p);
    ul.appendChild(p1);
    ul.appendChild(p2);
    ul.appendChild(p3);
    ul.appendChild(p4);
    div.appendChild(li);
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

    const li = document.createElement('li');
    li.setAttribute('class','item');

    const ul = document.createElement('ul');
    ul.setAttribute('class','list');

    const h1 = document.createElement('h1');
    h1.textContent =`${series.name}`;

    const img = document.createElement('img');
    img.setAttribute('class','mainPhotos');
    img.setAttribute('src',`src/photos/seriesPhotos/${series.name}.jpg`)
    

    const p = document.createElement('p');
    p.textContent =`Description: ${series.description}`;
    const p1 = document.createElement('p');
    p1.textContent = `Creator(s): ${series.creator}`;
    const p2 = document.createElement('p');
    p2.textContent = `Genre(s): ${series.genres}`; 
    const p3 = document.createElement('p');
    p3.textContent = `Series Ranking: ${series.ranking}`;
    const p4 = document.createElement('p');
    p4.textContent = `Season Info: ${series["seasons"]}`

   let div = document.querySelector('div#list');
    
   li.appendChild(ul)
   ul.appendChild(h1);
   ul.appendChild(img);
   ul.appendChild(p);
   ul.appendChild(p1);
   ul.appendChild(p2);
   ul.appendChild(p3);
   ul.appendChild(p4);
   div.appendChild(li);
  });
};
//Fetch all
function fetchAll() {
  fetch('http://localhost:3000/all')
  .then(response => response.json())
  .then(data => renderAll(data))
  .catch(error => console.log(error));
  };

function renderAll(data) {

  let all = [...data.movies,...data.series];
  alphaAll = sortAlphabetically(all);
  //all.foreach(,)
  renderMovies(data);
  renderSeries(data);
}
//Update requests

//Patch requests