# formloco

formloco is comprised of a cllient, server and a database. The frontend communicates with the server using an API. The API uses micro services architecture to provide authentication, security and data services for the frontend. The API is also the conduit through which data is passed to the formloco cloud database.

## Deployment

The fastest way to get up and running is to copy the `/dist/forms` folder into a web server directory. The app will run when you hit the web url in your browser.

The formloco frontend is written in Angular, you can fork or clone the repo to your local machine and use the Angular CLI to run it at `localhost:4200`.

Both these scenarios will run against the formloco API by default.

For information on how to deploy formloco to your own server or cloud service check out https://github.com/formloco/formloco/wiki/Deployment.

## Docs

formloco: https://github.com/formloco/formloco/wiki
Micro Services: https://github.com/formloco/formloco/wiki/Micro-Services
​
## License & copyright

Licensed under the [MIT License](LICENSE).
