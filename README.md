
# Bastó Technical Challenge

Technical challenge for Bastó. It is a React App using the stack MERN, with CRUD, pagination and testing.
## Instructions to run locally

1) Clone the repo to your PC.
2) Go to client folder and open a terminal there. Do npm install.
3) Go to server folder and open a terminal there. Do npm install.
4) In server folder, there is a sample .env file. Define the port you're going to use, for example, 3001. You'll need to setup a MONGO_URI, this has been tested through Mongo Atlas. Go to Mongo Atlas, create a free account, create a free cluster, then click on connect and you will get your MONGO_URI, copy and paste in your .env and save.
5) In your terminal in server folder, do the command npm run dev to start the server.
6) In your terminal in client folder, do the command npm start. You can now browse the site locally.
7) If you want to see pagination in action, you will need to create at least 6 animals, since the site shows 5 animals per page.
8) To run tests, open a terminal in server folder and do npm test.