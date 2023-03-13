# Artlocker
![mainpage](https://github.com/Flashrex/ArtLocker/tree/master/public/readme/main.png)

## Fullstack Web Applikation
Dieses Projekt ist als Uni-Projekt entstanden.
Das Thema war eine selbst gewählte FullStack-WebApplikation mit eigens festgelegtem Feature-Umfang.

## Features
- Registration/Login/Sessions
- Einstellen von Angeboten
- Übersicht über beliebte und aktuelle Angebote
- Individuelle Benutzerprofile mit Übersicht der eigenen (offenen und abgeschlossenen) Angeboten
- Usereinstellungen zum updaten von Profildaten wie Benutzernamen, Avatare, etc.
- Tracking von Angebotsaufrufen & Favorisierungen

## Tech

- [NodeJs](https://nodejs.org/en/) - evented I/O for the backend
- [Express](https://expressjs.com/) - fast node.js network app framework
- [Passport](https://www.passportjs.org/) - Simple, unobtrusive authentication for Node.js
- [DotEnv](https://www.npmjs.com/package/dotenv) - Module that loads environment variables from a .env file
- [Morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for node.js
- [MySql](https://www.npmjs.com/package/mysql) - node.js driver for mysql

## Setup

- Download project
- Setup database
-- User: [{++id:int++, username:string, firstname:string, surname:string, email:string, password:string, avatar:string}]
-- Paintings: [{++id:int++, title:string, description:string, author:int, price:float, image:string, createdAt:datetime, favs:int, views:int, sold:boolean}]
- Create .env file in root folder and add your database credentials
- Run project using "node index" from terminal in root folder
- Open "http://localhost:8080" in your browser

## Images
![painting](https://github.com/Flashrex/ArtLocker/tree/master/public/readme/painting.png)
![profile](https://github.com/Flashrex/ArtLocker/tree/master/public/readme/profile.png)
![settings](https://github.com/Flashrex/ArtLocker/tree/master/public/readme/settings.png)

