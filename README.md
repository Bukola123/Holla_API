# Holla API


- [Live Preview](https://documenter.getpostman.com/view/18539754/UVXnFtpX)

![Screenshot](Holla_API.png?raw=true "screenshot")

## Description



Holla is a social media platform that enables users to communicate with each other in different chat rooms. Typically, a user will create an account and can join and create channels (groups) in which they can chat with others. Admin privileges are automatically assigned to the creator of a channel and any other user that is designated an admin by the creator of that channel. An admin can add and remove users from a channel and can delete the channel.

## Technologies

The following technologies were used in this project:

-   [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
-   [Node.js](https://nodejs.org/en/)
-   [Express](https://expressjs.com/)
-   [MongoDB](https://www.mongodb.com/)
-   [JSON Web Tokens](https://jwt.io/)
-   [Heroku](https://www.heroku.com/)

## Requirements

Before starting, you need to have [Node.js](https://nodejs.org/en/) installed. Also ensure to create a .env file in the root directory of the project, and provide the following information:

DATABASE_URL: The URI of your MongoDB database.
JWT_SECRET: The secret key used to sign the JWT.

Kindly ensure that you are in the root directory before running the following commands.

## Install Dependencies

$ yarn
```

## Running the app


# development
$ yarn start
```
