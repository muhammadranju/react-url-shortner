# Md Ranju Portfolio Projects API

## Description

This is a simple API that allows you to create, read, update, and delete portfolio projects. It uses MongoDB as the database and Express.js as the web framework.

## Features

- Create a new portfolio project
- Read all portfolio projects
- Read a specific portfolio project
- Update a specific portfolio project
- Delete a specific portfolio project

## Installation

1. Clone the repository
2. Install the required dependencies by running `npm install`
3. Start the server by running `npm start`

## Usage

To create a new portfolio project, send a POST request to the `/projects` endpoint with the following JSON body:

```json
{
  "title": "Md Ranju Portfolio Projects API",
  "description": "This is a simple API that allows you to create, read, update, and delete portfolio projects.",
  "shortDescription": "Simple API for portfolio projects",
  "sourceCodeLink": "https://github.com/mdranju/mdranju-portfolio-projects-api",
  "liveLink": "https://mdranju-portfolio-projects-api.herokuapp.com",
  "coverImageLink": "https://example.com/cover.png",
  "author": {
    "name": "Md Ranju",
    "imageLink": "https://example.com/image.png"
  },
  "technologies": [
    "Javascript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "JSON Web Tokens",
    "Bcrypt"
  ]
}
```

## Response

```json
{
  "_id": "61e0a0f8c9b9c1e1a4f0b2e3",
  "title": "Md Ranju Portfolio Projects API",
  "description": "This is a simple API that allows you to create, read, update, and delete portfolio projects.",
  "shortDescription": "Simple API for portfolio projects",
  "sourceCodeLink": "https://github.com/mdranju/mdranju-portfolio-projects-api",
  "liveLink": "https://mdranju-portfolio-projects-api.herokuapp.com",
  "coverImageLink": "https://example.com/cover.png",
  "author": {
    "name": "Md Ranju",
    "imageLink": "https://example.com/image.png"
  },
  "slug": "md-ranju-portfolio-projects-api",
  "technologies": [
    "Javascript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "JSON Web Tokens",
    "Bcrypt"
  ],
  "timestamps": {
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

To read all portfolio projects, send a GET request to the `/projects` endpoint.

To read a specific portfolio project, send a GET request to the `/projects/:id` endpoint, where `:id` is the ID of the project you want to read.

To update a specific portfolio project, send a PUT request to the `/projects/:id` endpoint, where `:id` is the ID of the project you want to update. Include the updated project data in the request body.

To delete a specific portfolio project, send a DELETE request to the `/projects/:id` endpoint, where `:id` is the ID of the project you want to delete.

## Database

The database is MongoDB, and the connection details are stored in the `config/database.js` file. You can change the database connection details to match your own MongoDB setup.

<!--
## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To authenticate a user, send a POST request to the `/auth` endpoint with the following JSON body:

```json
{
  "email": "example@example.com",
  "password": "password"
}
```

If the authentication is successful, the server will return a JSON response with the following format:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJleHAiOjE2MTYyMzU2MDUsImlhdCI6MTYxNjIzNTYwNX0.3x0c-9-8-0-0-0-0-0-0-0-0-0-0-0-0-0-0"
}
```

You can then use this token in subsequent requests to authenticate the user. -->

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
