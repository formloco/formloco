# Client

The client is designed to run with the formloco API. The API uses micro services architecture to provide authentication and security, as well as data and connector services for the frontend. The API is the conduit through which data is passed to the formloco cloud database.

## Deployment

The fastest way to get up and running is to copy the `/dist/forms` folder into a web server directory. The app will run when you hit the web url in your browser.

The formloco frontend is written in Angular, you can fork or clone the repo to your local machine and use the Angular CLI to run it at `localhost:4200`.

Both these scenarios will run against the formloco API by default.

For information on how to deploy formloco to your own server or cloud service check out https://github.com/formloco/formloco/wiki/Deployment.

## Docs

https://github.com/formloco/formloco/wiki
​
## License & copyright

Licensed under the [MIT License](LICENSE).