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
body.innerHTML ='';
body.setAttribute('id','dark');

const divWebPage = document.createElement('div');
divWebPage.setAttribute('id','webPage');

const divSortOptions = document.createElement('div');
divSortOptions.setAttribute('id','sortOptionsDark');

const divWebTitle = document.createElement('div')
const h1WebTitle = document.createElement('h1');
const liWebTitle = document.createElement('li');

divWebTitle.setAttribute('class', 'webTitle');
liWebTitle.setAttribute('class','webSiteNameDark');
h1WebTitle.setAttribute('class', 'webSiteNameDark');
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

};

function darkMode(){
  let bodyLight = document.querySelector('body#light');
  if ( bodyLight !== undefined){
    
    bodyLight.setAttribute('id','dark');
    
    let divWebSiteNameLight = document.querySelector('div.websiteNameLight');
    divWebSiteNameLight.setAttribute('class','websiteNameDark');

    let divSortOptionsLight = document.querySelector('div#sortOptionsLight');
    divSortOptionsLight.setAttribute('id','sortOptionsDark');

    let liItemDark = document.querySelectorAll('.itemLight');
    liItemDark.setAttribute('class','itemDark');
    
  };
};

function lightMode(){
  let bodyDark = document.querySelector('body#dark');
  if ( bodyDark !== undefined){
    
    bodyDark.setAttribute('id','light');
    
    let divWebSiteNameDark = document.querySelector('li.webSiteNameDark');
    divWebSiteNameDark.setAttribute('class','websiteNameLight');

    let divSortOptionsDark = document.querySelector('div#sortOptionsDark');
    divSortOptionsDark.setAttribute('id','sortOptionsLight');

    let liItemDark = document.querySelectorAll('.itemDark');
    liItemDark.setAttribute('class','itemLight');
    
  };
};
//Sorting functions and navbar creation
const sortByMovie = () => {
  fetchAll(renderMovies);
};

const sortBySeries = () => {
  fetchAll(renderSeries);
}

const sortByNumbers = () => {
  let divList =document.querySelector('div#list');
  divList.innerHTML = '';
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
  const sortOptions = document.querySelector("div#sortOptionsDark");


//Sort by= starting character
function sortByStartingCharacter(textInput){  
  character = textInput.startsWith();
  for (character in textInput){
  if (character in numbers){
    
  }

  else if (character in alphabet){
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

}}

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
    a.setAttribute('class', 'topBarUnclickedDark');
    a.setAttribute('href', '#');
    a.textContent = `${option}`;
    console.log(option)



    a.addEventListener("click", (event) => {
      a.className='topBarClickedDark';
      event.preventDefault();
      function sortWordsAndPhrases(event){
        let stringValue = event.target.id;
        switch(stringValue) {
          case "0-9": 
            sortByNumbers();
            break;
          case "All":
            fetchAll(renderAll);
            break;
          case "Movies":
            sortByMovie(); 
            break
          case "Series":
            sortBySeries();
            break
          case "Dark":
            darkMode();
            break
          case "Light":
            lightMode();
            break
          }
        }
        sortWordsAndPhrases(event);
      }
    );

    const sortOptions = document.querySelector('div#sortOptionsDark')
    sortOptions.appendChild(a);
  };
};

buildSortIcons();
buildSearchBar();
handleSearchBar();
};


//GET requests and list creation

function renderMovies(list) {
  divList = document.querySelector('div#list');
  divList.innerHTML = '';
  list.movies.sort((a, b) => a.name.localeCompare(b.name));
  list.movies.forEach(movie => {

    const li = document.createElement('li');
    li.setAttribute('class','itemDark');

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

function renderSeries(list) {
  divList = document.querySelector('div#list');
  divList.innerHTML = '';
  list.series.sort((a, b) => a.name.localeCompare(b.name));
  list.series.forEach(series => {

    const li = document.createElement('li');
    li.setAttribute('class','itemDark');

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

function renderAll(data) {

  const all = [...data.movies,...data.series];
  all.sort((a, b) => a.name.localeCompare(b.name));
  renderData(all);
};

function fetchAll(callBack) {
  fetch('http://localhost:3000/all')
  .then(response => response.json())
  .then(data => callBack(data))
  .catch(error => console.log(error));
};

function renderData(array){
  divList = document.querySelector('div#list');
  divList.innerHTML = '';
  array.forEach(item => {
    
    if (item.seasons !== undefined){
      
      const li = document.createElement('li');
      li.setAttribute('class','itemDark');
      
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
    li.setAttribute('class','itemDark');

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
};
//Update requests

//Patch requests