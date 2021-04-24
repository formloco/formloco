# formloco Server

The server consists of NodeJS/Express Micro services contained in named folders with the following attributes.

- Each folder has its own server file named for the area of focus.

- Each server runs on its own port. 

- Each port is referenced by a URL name on the NGINX reverse proxy server. 

- Each URL name has a matching entry in the production environment Angular frontend.

The server environment file `.env` contains the credentials, host and port information for the database. This file is not included and will have to be created, here is thee format.

DBUSER=#######
HOST=#########
PASSWORD=#######
PORT=####
SECRET=#########


To learn more visit our wiki: https://github.com/formloco/formloco/wiki/Micro-Services

## License & copyright

Licensed under the [MIT License](LICENSE).