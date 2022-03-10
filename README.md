# <img src="./frontend/src/files/rende-you-icon.svg" width=30px> RendeYou <img src="./frontend/src/files/rende-you-icon.svg" width=30px>

![RendeYou Logo](./frontend/src/files/rende-you-logo.svg)

_RendeYou_ is a **MERN Stack** full stack web application that connects users with an emphasis on immediate meetups with friends.

To check a currently deployed version of RendeYou, please visit [https://rendeyou.bliu.tech](https://rendeyou.bliu.tech).\
**Warning:** It is recommend that you use Firefox for this deployment of RendeYou and you will need to unblock mixed content. For more information on how to do this, visit the instructions [here](https://support.mozilla.org/en-US/kb/mixed-content-blocking-firefox).

## Table of Contents
- [Features](https://github.com/bliutech/RendeYou/#features)
- [Technologies](https://github.com/bliutech/RendeYou/#technologies)
- [Setup](https://github.com/bliutech/RendeYou/#setup)
- [Authors](https://github.com/bliutech/RendeYou/#authors)

## Features

- Friending Other Users
The app allows users to add friends, and those friends' events will automatically appear on the user's home page. This allows users to not be inundated with irrelevant events from strangers.
- Notifications
We created a Chrome extension to our app that users can optionally install. It pushes notifications through the browser, so the user can be notified of events even while away from our site.
- Location Suggestions
On our event creation page, we used an input widget which integrates with Google Maps to suggest specific addresses based on the user's input to make it easier to write locations.
- Friend Suggestions
Our app displays a list of the user's friends' friends to make it easier to make connections. Once you have at least one friend, finding new friends becomes a simple matter of clicking some buttons instead of manually typing their username into the search bar.

## Technologies
 - Javascript <img src="https://seeklogo.com/images/J/javascript-logo-8892AEFCAC-seeklogo.com.png" alt="javascript" width="30px">
 - Node.js <img src="https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png" alt="node.js" width="30px">
 - React.js <img src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" alt="react.js" width="30px">
 - Express.js <img src="https://www.sohamkamani.com/static/65137ed3c844d05124dcfdab28263c21/38cea/express-routing-logo.png" alt="Express.js" height="30px">
 - MongoDB <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/MongoDB_Logo.png/1598px-MongoDB_Logo.png?20180423174357" alt="MongoDB" height="30px">

## Setup
In order to run a local instance of RendeYou, first clone or download a copy of this repository. Follow the instructions below to initialize a local instance of each part of the application.

### Backend Instructions
#### Setup
To setup the dependencies for the backend server, run:
```
cd backend
npm install
```
which should download a set of `node_modules` for the backend server.

Main backend dependencies:
- Express.js - the web server library which powers everything
- Mongoose - an object-document mapping library for MongoDB

#### Secrets
Create a `.env` file in the backend folder with the following contents:
```
DB_URL=mongodb+srv://jason:ogrdmalus@cluster0.5dxdz.mongodb.net
DB_NAME=RendeYou_test_<YOUR NAME HERE>
SESSION_SECRET=abcd1234
ENV=dev
PORT=8000
CHECK_PERIOD_MIN=120
SESSION_LIFETIME_MIN=60
```

Important: write your name at the end of `DB_NAME` (e.g. I have `RendeYou_test_jason`). This way, we can have separate testing databases.

The `SESSION_SECRET` value can be anything you want (for testing purposes). If you want to generate a proper secret key, run:
```
openssl rand -hex 64
```

This line:
```
ENV=dev
```
controls backend settings such as allowed frontend origins.

#### Running
```
cd backend
npm start
```
The backend server will be available on http://localhost:8000. The root document will display a bare-bones testing page.

### Frontend Instructions
#### Setup
To setup the dependencies for the frontend application, run:
```
cd frontend
npm install
```
which should download a set of `node_modules` for the backend server.

Main frontend dependencies:
- React.js
- react-router-dom - simulates paths for different pages

#### Configuration
If you are testing the frontend with a local instance of the backend, run this command from the project root:
```
sed -i 's/ENV: "production"/ENV: "dev"/' frontend/src/settings.js
```
This will ensure that the frontend is configured to use the local backend, instead of our hosted backend (which will not allow your local frontend to connect).

#### Running
To start the frontend application, run:
```
cd frontend
npm start
```
The frontend will be available on http://localhost:3000, which should appear in your browser automatically.

### Chrome Extension Instruction
The Extras page ([https://rendeyou.bliu.tech/#/extras](https://rendeyou.bliu.tech/#/extras)) contains the zip file for the Chrome extension. Open Chrome and navigate to `chrome://extensions`. Turn on developer mode at the top right of the screen, and click on "Load Unpacked" in the toolbar that should have just displayed. Navigate inside the "Load Unpacked" navigation filesystem to you unzipped file fo the extension and select the ```dist``` folder inside to load into Chrome. If you click on your Chrome extensions, the RendeYou extension should be there for you to login and use.

## Authors
_RendeYou_ was made as a project for **CS 35L** taught by Professor Paul Eggert at UCLA in Winter 2022. **Made by**: Benson Liu, Connor Pedersen, Jason Cheng, Ming Zhu, & Rishab Khurana.
