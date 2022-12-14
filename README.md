# phase-1-project

My phase 1 project utilizes a database created using a db.json file from information and images of movies and tv series that could be found on IMDB. This project focuses on sorting the database information based on the names of the movies and series with plans to grow into a more robust platform focused on sorting functionality.

## Installing and using the project
This program was intended to be used in conjunction with json-server. Before installing this software please ensure that json-server is installed on the device. 
This software can be used with any database, but will currently only function if there is a name key for the objects. A video of the software's current functionality can be found here https://youtu.be/z8OfCbCQdhw.

```linux
npm install -g json-server
git clone git@github.com:jhardamon/phase-1-project.git

I used visual studio code when working on this and suggest it, but you can use any editor you would like. I will explain more technical aspects of the program below.

## Usage

This program does not utilize window refreshes and is a single page that relys on DOM manipulation in order to render changes. Most functionality will wipe the listed movies and series using .innerHTML in order to display the sorted or searched ones. Please note that there is an error that will be thrown if you click on dark or light mode twice in a row due to the use of !== undefined when querying the <body> element. The webpage initializes using the following functions.
//Initialization of webpage
const init = () => {
  pageCreation()
  buildSortOptionsToolBar();
  fetchAll(renderAll);
};
document.addEventListener('DOMContentLoaded', init);

A skeleton of the html structure is built using pagecreation, which manipulates the DOM and appends a number of child nodes. 
The buldSortOptionsToolBar is a very packed function incorporating many of the sort features as well as creation of the tool bar. 
The fetchAll() function takes a callback function and displays the movie and series information on the page based on the chosen callback. This assists with Sort functionality.

Theses three functions are calle in the init function when the DOMContentLoaded event listener is triggered.

Functionality is not guaranteed if modifications are made to these three functions.

## Bugs

Dark and light mode is bugged so I changed all of the text color to black in dark and light mode. I will go back in and update when I have some time.


## Contributing

If you have any suggestions I am open to them and appreciate any feedback you may have for improvements.

##Next Steeps
I plan to build every type of sort and search functionality as I learn more into this program as a way to retain the knowledge.
