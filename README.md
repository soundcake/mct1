<h2>Info</h2>

<hr />
A very simple implementation of a REST API, utilising NodeJS, ExpressJS (axios, body-parser, express-session). The api utilises promises when making requests to OMDB API.
<hr />
Endpoints:
<ul>
<li><a>http://localhost:3000/movies</a> - GET - returns all movies from movies.json file, enriched by data from OMDB API</li>
<li><a>http://localhost:3000/movies/view</a> - GET - returns further details about a parituclar movie (takes imdbId request param)</li>
<li><a>http://localhost:3000/basket</a> - GET - returns the contents of the basket (stored in session)</li>
<li><a>http://localhost:3000/basket/add</a> - POST - adds a movie to the basket, if the movie already exists in the basket it increases quantity by 1 (takes imdbId body param) - returns status 201</li>
<li><a>http://localhost:3000/basket/update</a> - POST - update the quantity of the movie in the basket (takes imdbId and quantity body params) - returns status 204</li>
<li><a>http://localhost:3000/basket/delete</a> - DELETE - deletes all quantity of the movie from the basket (takes imdbId body param) - returns status 204</li>
<li><a>http://localhost:3000/basket/checkout</a> - POST - performs checkout calculations - prints out the figures in the console output - returns status 204</li>
</ul>

<hr />

<h2>Setup</h2>
To get up and running, clone the repo and then run in the projects root directory:

````
docker build --tag mct1 .
docker run -p 3000:3000 mct1  
````
The postman collection is included in this repo - MachineCompare1.postman_collection.json
<hr />
<h2>If extra time available</h2>
A number of possible improvements would be possible, including:
<ul>
<li>Code refactoring to improve readability and prevent repetition (data.js etc)</li>
<li>Implement security / authentication (possible JWT-based, stateless)</li>
<li>Make better use of headers, CORS</li>
<li>Handle request / body params properly</li>
<li>Handle errors and edge cases properly</li>
<li>unit tests / postman tests</li>
<li>Implement a database to persist data, possibly develop user accounts</li>
</ul>