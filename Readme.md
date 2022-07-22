###### HW1
Build a simple todo list. No frameworks or libraries, only vanilla JS code. It should have the ability to add new items, 
delete all items, reload data, edit specific items, delete specific items. Data should persist even when closing the browser.

###### HW2

Expanding on previous homework, it should separate the UI/logic layer with the data storage layer in the code. It should 
make use of static module loading to load 2 different data storage strategy modules (local storage, indexed db) using strategy 
design pattern and classes. The data storage modules should be accessed in an asynchronous style with promises. Rename main.html to index.html.

###### HW3
- Create a node.js backend with an API layer for server side storage.
- Create a client side storage module to interact with server API (3rd one on client side).
- Create a server side storage implementation as a flat file database using strategy design pattern and classes (1st on server side).
- Modify index.html to have a picker control to switch storage implementation between local storage, indexed db and server side.
- Create a package.json file with all the common attributes. Scripts should include "start" and "debug" (using --inspect).

###### HW4
- Use cookies to persist storage engine setting
- Implement framework as either [Vue + Vuetify + TypeScript + Webpack] or [React + MUI + TypeScript + Webpack]
- Add ES Lint for style checking
- Implement hot reloading