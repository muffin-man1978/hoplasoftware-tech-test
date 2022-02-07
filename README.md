# ITunes technical test

# Backend application

Runs in port 8000.
Coded in TS for showcase purposes.

Contains an agnostic data origin factory, described in:

/src/model/album.dataorigin.ts
/src/model/album.dataorigin.types.ts

and configured in application.config.ts

It has a connection string for a public Atlas MongoDB cluster in the file mongodb.config.ts
The MongoDB database does not have the list of albums, therefore, search by string is not done, it is there
for showcasing purposes of the factory for the origin of data.

To run:

- cd backend
- npm install
- npm run dev / nodemon

To test (uses jest)

- cd backend
- npm run test


# Frontend application

Runs in port 8081.
Coded in ES6 for showcase puropses

To run:

- cd vue-js-frontend
- npm install
- npm run serve  (This will use vue-cli-service to serve with hot reload)

To test:

- cd frontend
- npm run test:unit

# Usage

- Start both frontend and backend application.
- Open browser to http://localhost:8001
- The instructions for the frontend are in the frontend itself

# Second Task, analysis

In the file https://github.com/muffin-man1978/hoplasoftware-tech-test/blob/master/Question2.js you can find the code, commented where appropiate,
and refactored after the comments.

# TODO

More testing