Todo Aplication - Frontend

the React frontend for the todo list app. it connects to the node.js bakend i made.

You can see it Live here: https://adarshtodoassignment8.netlify.app

how to run it locally

clone this project
git clone https://github.com/adarshsingh101/TodoFrontend.git

go into the folder
cd todo-frontend

install the packages
npm install

IMPORTANT: you have to make sure the backend is runing first!!

then you can just run:
npm start

Some Challenges

it was hard to get the UI to update right away when i deleted a task. i learned i had to use setTodos to filter the old list and show the new one. State management in React is tough.

The deployment was the hardest part. first a 502 Bad Gateway error because i forgot the MONGO_URI on render. then i got a CORS error because the server was crashing and not sending the right headers. had to fix the IP whitelist on mongoDB to allow access from anywhere. that was a LOT of debugging.
