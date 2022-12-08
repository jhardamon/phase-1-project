//Initialization of webpage
const init = () => {
  pageCreation()
  buildSortOptionsToolBar();
  fetchAll(renderAll);
     };
document.addEventListener('DOMContentLoaded', init);


//javascript creation of html skeleton
function pageCreation(){

const title = document.querySelector('title');
title.setAttribute('value','Welcome to searchTube');

const body = document.querySelector('body');
body.textContent =null;

const divWebPage = document.createElement('div');
divWebPage.setAttribute('id','webPage');

const divSortOptions = document.createElement('div');
divSortOptions.setAttribute('id','sortOptions');

const divWebTitle = document.createElement('div')
const h1WebTitle = document.createElement('h1');
const liWebTitle = document.createElement('li');

divWebTitle.setAttribute('class', 'webTitle');
liWebTitle.setAttribute('class','websiteName');
h1WebTitle.setAttribute('class', 'websiteName');
h1WebTitle.textContent='Welcome to searchTube';

const pWebTitle = document.createElement('p');
pWebTitle.textContent='Here at SearchTube you can search and sort through our database for information on movies and tv shows using the above icons and search form to find out anything you need!!!'

liWebTitle.appendChild(h1WebTitle);
liWebTitle.appendChild(pWebTitle);
divWebTitle.appendChild(liWebTitle);
divWebPage.appendChild(divWebTitle);

const divList = document.createElement('div');
divList.setAttribute('id','list');


divWebPage.appendChild(divSortOptions);
divWebPage.appendChild(divList);

body.appendChild(divWebPage);

} 


//Sorting functions and navbar creation
const sortByMovie = () => {
  let list = document.querySelector('div#list');
  list.innerHTML= '';
  fetchMovies();
};

const sortBySeries = () => {
  let list =document.querySelector('div#list');
  list.innerHTML = '';
  fetchSeries();
}

const sortByNumbers = () => {
  let list =document.querySelector('div#list');
  list.innerHTML = '';
  fetch('http://localhost:3000/all')
  .then(resp => resp.json())
  .then(data => {
    const all = [...data.movies,...data.series];

  })
  .catch(error => console.log(error));
};

function sortAllAlphabetically(array){
  array.sort((a, b) => a.name.localeCompare(b.name));

};

function buildSortOptionsToolBar() {
  //Multi-use reference Variables
  const capitalLetters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  const wordsAndPhrases = ["0-9","All","Movies","Series","Dark","Light"]
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
    let movies = sortByMovie();
    let series = sortBySeries();
    console.log(movies);
    console.log(series);
    return 
  }
  else{
    error = 'Input must be alphanumeric.';
    console.log(error);
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

const handleSearchBar = () => {
    form = document.querySelector('form');
    form.addEventListener('submit',(event) =>{
    event.preventDefault();
    let request = event.target.searchBar.value;
    request.foreach( character =>{
      if (not(character in alphanumeric)){
        error = 'Input must be using alphanumeric character!'
        setTimeout(alert(error),"3000")
      }
      else{
        fetch("http://localhost:3000/all")
        .then(resp => resp.json())
        .then(data => {
          let all = [...data.movies, ...data.series];


        
        })
        .catch(error => console.log(error));
      }
      
      });
    form.reset()
  });
};

function searchEngine(){

};

function buildSortIcons(){

  for (let option of sortOptionsIcons ){
    let a = document.createElement('a');
    a.setAttribute('id',`${option}`);
    a.setAttribute('class', 'topBarUnclicked');
    a.setAttribute('href', '#');
    a.textContent = `${option}`;
    a.addEventListener("click", (event) => {
      a.className='topBarClicked';
      event.preventDefault();
      function sortWordsAndPhrases(){
        stringValue = a.textContent;
        if (stringValue in sortOptionsIcons){
          console.log(stringValue);
        }
      };
      sortWordsAndPhrases();
    });
    const sortOptions = document.querySelector('div#sortOptions' )
    sortOptions.appendChild(a);
  };
};

buildSortIcons();
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
  list.movies.sort((a, b) => a.name.localeCompare(b.name));
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
    img.setAttribute('title',`${movie.name}`);

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
  list.series.sort((a, b) => a.name.localeCompare(b.name));
  list.series.forEach(series => {

    const li = document.createElement('li');
    li.setAttribute('class','item');

    const ul = document.createElement('ul');
    ul.setAttribute('class','list');

    const h1 = document.createElement('h1');
    h1.textContent =`${series.name}`;

    const img = document.createElement('img');
    img.setAttribute('class','mainPhotos');
    img.setAttribute('src',`src/photos/seriesPhotos/${series.name}.jpg`);
    img.setAttribute('title',`${series.name}`);
    

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

function fetchAll(callBack) {
  fetch('http://localhost:3000/all')
  .then(response => response.json())
  .then(data => callBack(data))
  .catch(error => console.log(error));
  };

function renderAll(data) {

  const all = [...data.movies,...data.series];
  all.sort((a, b) => a.name.localeCompare(b.name));
  renderData(all);
}

function renderData(array){
  array.forEach(item => {
    
    if (item.seasons !== undefined){
      
      const li = document.createElement('li');
      li.setAttribute('class','item');
      
      const ul = document.createElement('ul');
      ul.setAttribute('class','list');
      
      const h1 = document.createElement('h1');
      h1.textContent =`${item.name}`;
      
      const img = document.createElement('img');
      img.setAttribute('class','mainPhotos');
      img.setAttribute('src',`src/photos/seriesPhotos/${item.name}.jpg`);
      img.setAttribute('title',`${item.name}`);
    
      const p = document.createElement('p');
      p.textContent =`Description: ${item.description}`;
    
      const p1 = document.createElement('p');
      p1.textContent = `Creator(s): ${item.creator}`;
    
      const p2 = document.createElement('p');
      p2.textContent = `Genre(s): ${item.genres}`; 
    
      const p3 = document.createElement('p');
      p3.textContent = `Series Ranking: ${item.ranking}`;
    
      const p4 = document.createElement('p');
      p4.textContent = `Season Info: ${item["seasons"]}`
      let div = document.querySelector('div#list');
    
      li.appendChild(ul);
      ul.appendChild(h1);
      ul.appendChild(img);
      ul.appendChild(p);
      ul.appendChild(p1);
      ul.appendChild(p2);
      ul.appendChild(p3);
      ul.appendChild(p4);
      div.appendChild(li);
  }
  else {
    const li = document.createElement('li');
    li.setAttribute('class','item');

    const ul = document.createElement('ul');
    ul.setAttribute('class','list');

    const h1 = document.createElement('h1');
    h1.textContent = `${item.name}`;

    const img = document.createElement('img');
    img.setAttribute('class','mainPhotos');
    img.setAttribute('src',`src/photos/moviePhotos/${item.name}.jpg`);
    img.setAttribute('title',`${item.name}`);

    const p = document.createElement('p');
    p.textContent =`Description: ${item.description}`;
    const p1 = document.createElement('p');
    p1.textContent = `Director: ${item.director}`;
    const p2 = document.createElement('p');
    p2.textContent = `Genre(s): ${item.genres}`; 
    const p3 = document.createElement('p');
    p3.textContent = `Movie Ranking: ${item.ranking}`;
    const p4 = document.createElement('p');
    p4.textContent = `Year Released: ${item["Year Released"]}`;

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
  }

});
}
//Update requests

//Patch requests