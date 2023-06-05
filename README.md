Twitter Clone (Chitter) App 
=================

### How to run the App:
0. Go to https://glittering-starship-2d6852.netlify.app/ and start peeping!🚀 I have deployed the backend using Render, with the deployed API URL: https://my-chitter-app.onrender.com . I've then used Netlify to deploy the frontend of the application.

The Chitter repository is divided into two main folders: backend and frontend. 

1. In each folder, you need to run the `npm install` command. 
2. To start the Express Server in the backend, you need to run the `npm start` command. Make sure your terminal is in the backend folder. The MongoDB database is stored in the cloud using a MongoDB Atlas cluster. The application is connected to the cluster through a connection string, so you do not need to install MongoDB.
3. To start the React App in the frontend, you need to run the `npm start` command. Make sure your terminal is in the frontend folder.
4. Both in frontend and backend, you can run `npm test` command. The backend tests have been done with Mocha, Chai, and Chai-http. The frontend tests have been done with React Testing Libraries and Jest. Unfortunately, there are some act warnings that I have not been able to handle. The Front End has 45 passing tests, and the Back End has 6 passing tests.
5. .env variables have been added to both the frontend and backend to run the tests, deployment and the development in different URLs (in deployment the backend API is hosted by Render). The back end tests are done in the chitter-test database instead of ChitterDB, so that they are done in a controlled environment. 
_______

### Wireframe and Components Hierarchy:

Follow the colors to know the position of each component in the hierarchy.

![Chitter mockup](/wireframe.png)
______

### Back End routes and services:

Each route is linked to a react component in the Front End.

- `"/peeps"` routes: 
    1. `post("/", auth, createPeep)`: if the user is logged in this route creates a new Peep with the text typed by the user. React component: **NewPeep**.
    2. `get("/", getPeeps)`: it gets all the peeps. React component: **PeepList**.
    3. `post("/comment", auth, createComment)`: if the user is logged in, it creates a new Comment with the text typed by the user. React component: **NewComment**.

- `"/users"` routes:
    1. `post("/register", signupValidator, registerUser)`: if the user has introduced their details correctly, it creates a new User. React component: **SignUp**.
    2. `post("/login", loginUser)`: if the user has introduced their details correctly, it validates them and stores a token in localStorage. React component: **LogIn**.

__________
### Requirements implemented: ✅
```
As a trainee software engineer
So that I can let people know what I am doing  
I want to post a message (peep) to chitter 

As a trainee
So that I can see what others are saying  
I want to see all peeps in reverse chronological order 

As a trainee
So that I can better appreciate the context of a peep
I want to see the time at which it was made 

As a trainee
So that I can post messages on Chitter as me
I want to sign up for Chitter 

As a trainee
So that only I can post messages on Chitter as me
I want to log in to Chitter 

As a trainee
So that I can avoid others posting messages on Chitter as me
I want to log out of Chitter 
```

### Additional criteria implemented: ✅


* You don't have to be logged in to see the peeps. 
* Trainee software engineers sign up to chitter with their email, password, name and a username (e.g. ewright@digitalfutures.com, password123, Ed Wright, edwright6975). 
* The username and email are unique. 
* Peeps (posts to chitter) have the name of the trainee and their user handle. 
* Your README should indicate the technologies used, and give instructions on how to install and run the tests. 

### Extended Requirement implemented: ✅

```
As a trainee
In order to start a conversation as a DFA trainee Software Engineer
I want to reply to a peep from another trainee. 
```




