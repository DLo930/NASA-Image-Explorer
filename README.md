# NASA Image Explorer
### Overview
NASA Image Explorer is a web app that features a search bar, with the three basic search fields of Keywords, Start Year, and End Year. More specific queries can be handled by simply clicking the “Advanced search” button, which toggles the visibility of the advanced search fields. Upon form submission, results appear in a grid format and the user can click on a tile to bring up a popup box that displays the image’s metadata. Additionally, the user can share the original image via a few social media buttons. Last but certainly not least, the app features login functionality. There isn’t a registration box, but a new user can register simply by entering a unique email and password. Existing users login by entering their email and correct password. Logging in allows the user to add results to their Favorites (the button shows up in the popup box). 

### Implementation
The project was developed with MongoDB, Express.js, React, and Node.js (MERN) as the tech stack. First, the search form submission triggers an http POST request to the Node server with the form data as a JSON string. Next, the server sends the JSON retrieved from the NASA Image API to the React frontend to change its state. Each item in the “items” array of the JSON is rendered as a Tile component, which on click, toggles the popup box that displays the enlarged image as well as informative metadata. Along the bottom of the box are four social media buttons that allow the user to share the original image. Navigating between pages of results increments or decrements the current page number and re-renders the TileGrid component, which in turn re-renders each individual Tile. Login functionality was enabled by Mongoose/MongoDB. The User Schema stores email, password, and a Map of Strings for favorited items. Given that the Mongoose Map SchemaType is a hash table, insertion and retrieval are both of O(1), assuming that the underlying implementation is performant (ie: capacity and hash function). Registration is handled by adding a new User document to MongoDB with the provided email, hashed password (BCrypt library), and empty Map. Login is handled by using BCrypt’s string comparison function to verify the password. Upon successful registration or login, the favorite button appears in popup boxes, which adds or deletes items from the Map. The final app was deployed to Google Cloud Platform on its App Engine. 

### Obstacles
A major limitation to my progress on the web app was my lack of experience in web programming. Previously, I had been primarily involved in competitive programming, using general-purpose languages such as Java and C++ to solve comparatively small theoretical problems in CS. The learning curve was therefore steep during the project, with hours spent surfing API documentation, StackOverflow, and other resources to pick up new concepts and resolve issues independently. Although the app is a bit clunky, the essential functions are working properly. 

### Links
A working build of this project can be found at http://nasa-image-explorer.appspot.com and the code repository is accessible at https://github.com/DLo930/NASA-Image-Explorer. 

### Running code locally
```
$ git clone https://github.com/DLo930/NASA-Image-Explorer.git
$ npm start
```
