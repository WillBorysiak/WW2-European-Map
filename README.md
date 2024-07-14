<h1 align="center">WW2 European Map</h1>

<h2 align="center">Purpose of the App:</h2>

<h3 align="center"><i>To provide an user interface to display infomation of battles in the European theatre of WW2.</i><h3>

<h2 align="center">Technology used</h2>
  
<div align="center">
  <img align="center" src="/docs/readme/icons/html5.svg" alt="HTML" height="50"/>
  <p align="center"><i>HTML5</i></p> 
</div>
   
<div align="center">
  <img align="center" src="/docs/readme/icons/css3.svg" alt="CSS3" height="50"/>
  <p align="center"><i>CSS3</i></p> 
</div>
<i>/
<div align="center">
  <img align="center" src="/docs/readme/icons/javascript.svg" alt="JavaScript" height="50"/>
  <p align="center"><i>JavaScript</i></p> 
</div>

<div align="center">
  <img align="center" src="/docs/readme/icons/sass.svg" alt="SASS" height="50"/>
  <p align="center"><i>SASS</i></p> 
</div>

<div align="center">
  <img align="center" src="/docs/readme/icons/webpack.svg" alt="Webpack" height="50"/>
  <p align="center"><i>Webpack</i></p> 
</div>

<h2 align="center">How The Application Works</h2>

- The application uses HTML, SCSS and Javascript with the leaflet library to show a side panel and map that contain information about WW2 battles/events.
- Javascript renders the side panels using SCSS to style and provide image backgrounds.
- The leaflet library renders a map that has markers which correlate to one of the WW2 battles.

<h2 align="center">What I learnt</h2>

- How to use an external library and read their documentation for instructions.
- Structuring an app using the Class syntax with methods and properties.
- Improved my understanding of Object Oriented Programming by the usage of ‘this’ and the prototype model.
- How to traverse the DOM and handle events to change the appearance of the content.
- Improved my ability to use functional programming to manage data from arrays and objects.
- Utilise SASS to manage media queries by using variables and breakpoints.
- How to set up Webpack to process all of your files into a bundle for production.
- How to host a project on Netlify and set up continuous deployment from GitHub.

<h2 align="center">What Was The Biggest Challenge</h2>

The biggest challenge was getting the leaflet library to work smoothly inside my main JavaScript class as I had to manage the 'state' of the markers and the panels. I had to traverse the DOM on certain events which is made far easier by React or even JQuery as the view is easy to manipulate. The leaflet library has its own object that handles its user interface and you cannot always cleanly access it inside nested functions. If a panel was open then clicking another panel should close all the other panels and navigate to that location, same for the markers however this look some trial and error. If I was to make this project again, I would use React for sure but this served as a good learning experience as I have used Leaflet since!
