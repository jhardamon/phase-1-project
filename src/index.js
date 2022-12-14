//Initialization of webpage
const init = () => {
  pageCreation()
  buildSortOptionsToolBar();
  fetchAll(renderAll);
};
document.addEventListener('DOMContentLoaded', init);

//Reference varables for sort functions
const numbers = ['0','1','2','3','4','5','6','7','8','9'];
const capitalLetters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

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
  let body = document.querySelector('body');
  if ( body !== undefined){
    
    body.setAttribute('id','dark');

    let liWebSiteNameLight = document.querySelector('li');
    liWebSiteNameLight.setAttribute('class','websiteNameDark');
    
    let h1WebSiteNameLight = document.querySelector('h1');
    h1WebSiteNameLight.setAttribute('class','websiteNameDark');
    
    let divSortOptionsLight = document.querySelector('div#sortOptionsLight');
    divSortOptionsLight.setAttribute('id','sortOptionsDark');

    let liItemLight = document.querySelectorAll('li.itemLight');
    liItemLight.forEach((item) => item.setAttribute('class','itemDark'));
    
  };
};

function lightMode(){
  let body = document.querySelector('body');
  if ( body !== undefined){
    
    body.setAttribute('id','light');

    let liWebSiteNameDark = document.querySelector('li');
    liWebSiteNameDark.setAttribute('class','websiteNameLight');
    
    let h1WebSiteNameDark = document.querySelector('h1');
    h1WebSiteNameDark.setAttribute('class','websiteNameLight');
    
    let divSortOptionsDark = document.querySelector('div#sortOptionsDark');
    divSortOptionsDark.setAttribute('id','sortOptionsLight');

    let liItemDark = document.querySelectorAll('li.itemDark');
    liItemDark.forEach((item) => item.setAttribute('class','itemLight'));
    
  };
};
//Sorting functions and sort icons creation
const sortByMovie = () => fetchAll(renderMovies);

const sortBySeries = () =>  fetchAll(renderSeries);

function buildSortOptionsToolBar() {
  //Multi-use reference Variables
  const wordsAndPhrases = ["0-9","All","Movies","Series","Dark","Light"]
  const sortOptionsIcons = [...capitalLetters,...wordsAndPhrases]
  const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  const alphanumeric = [...alphabet,...capitalLetters, ...numbers];
  const sortOptions = document.querySelector("div#sortOptionsDark");

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
  
};

const handleSearchBar = () => {
    form = document.querySelector('form');
    form.addEventListener('submit',(event) =>{
    event.preventDefault();
    let request = event.target.searchBar.value;
    searchEngine(request);
    form.reset();
  });
};

function searchEngine(string){
  fetch('http://localhost:3000/all')
  .then(response => response.json())
  .then(data => {
    const all = [...data.movies,...data.series];
    let searchResults = []
    all.forEach((item) => {
      const title = item.name.toLowerCase();
      if (title.includes(string.toLowerCase())){
        searchResults.push(item);
      }
    });
    renderData(searchResults);
  })
  .catch(error => console.log(error));
};

function buildSortIcons(){

  for (let option of sortOptionsIcons ){
    let a = document.createElement('a');
    a.setAttribute('id',`${option}`);
    a.setAttribute('class', 'topBarUnclickedDark');
    a.setAttribute('href', '#');
    a.textContent = `${option}`;

    a.addEventListener("click", (event) => {
      const allAnchors = document.querySelectorAll('a');
      allAnchors.forEach((item) => item.className = 'topBarUnclickedDark');
      a.className='topBarClickedDark';
      function sortWordsAndPhrases(event){
        let stringValue = event.target.id;
        switch(stringValue) {
          case "0-9":
            fetchAll(renderAll,stringValue);
            break;
          case "All":
            fetchAll(renderAll);
            break;
          case "Movies":
            sortByMovie(); 
            break;
          case "Series":
            sortBySeries();
            break;
          case "Dark":
            darkMode();
            break;
          case "Light":
            lightMode();
            break;
          default:
            fetchAll(renderAll,stringValue);
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

function renderAll(data,startingCharacter) {
  const all = [...data.movies,...data.series];
  all.sort((a, b) => a.name.localeCompare(b.name));
  if (startingCharacter === "0-9"){
    const startingCharacterAllOfNumbers = []
    all.forEach((item)=>{
      if ( numbers.includes(item.name[0])){
        startingCharacterAllOfNumbers.push(item);
    };
    renderData(startingCharacterAllOfNumbers);
  });
  }

  else if (capitalLetters.includes(startingCharacter)){
    const startingCharacterAllOfAlphabet = [];
    all.forEach((item)=>{
      if (item.name.startsWith(startingCharacter)){
        startingCharacterAllOfAlphabet.push(item);
    }
    renderData(startingCharacterAllOfAlphabet);
  })}
  
  else {
  renderData(all);
};
};

function fetchAll(callBack,startingCharacter) {
  if (startingCharacter != undefined){
    fetch('http://localhost:3000/all')
    .then(response => response.json())
    .then(data => callBack(data,startingCharacter))
    .catch(error => console.log(error));
  }
  else {
    fetch('http://localhost:3000/all')
    .then(response => response.json())
    .then(data => callBack(data))
    .catch(error => console.log(error));
};
}

function renderData(array){
  divList = document.querySelector('div#list');
  divList.innerHTML = '';
  array.sort((a, b) => a.name.localeCompare(b.name));
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

