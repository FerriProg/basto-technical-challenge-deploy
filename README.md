
# Bastó Technical Challenge

Technical challenge for Bastó. It is a React App using the stack MERN, with CRUD, pagination and testing.
## Instructions to run locally

1) Clone the repo to your PC.
2) Go to client folder and open a terminal there. Do npm install.
3) Go to server folder and open a terminal there. Do npm install.
4) In server folder there is a sample .env file. Define the port you're going to use, for example, 3001. You'll need to setup a MONGO_URI, this has been tested through Mongo Atlas. Get your MONGO_URI in Atlas, and copy/paste it in your .env and save. In case you're having trouble here, there's a detailed explanation in the Appendix below.
5) In your terminal in server folder, do the command npm run dev to start the server.
6) In your terminal in client folder, do the command npm start. You can now browse the site locally.
7) If you want to see pagination in action, you will need to create at least 6 animals, since the site shows 5 animals per page.
8) To run tests, open a terminal in server folder and do npm test.
## Appendix: getting the MONGO_URI from Mongo Atlas

1) Go to Mongo Atlas, create a free account.
2) It will ask you to create an organization. Give it any name you want.
3) Click on "next" and then click "Create Organization".
4) Now click on "Create Project" to create a project for your organization.
5) Give it any name you want, then click "Next", and then click "Create Project".
6) Once it is created, click on "Create a Database".
7) Choose the free shared option, and "Create".
8) Then click on Create Cluster.
9) Once created, choose a User and Password for your free cluster, and click on "Create User".
10) Now go down to the section "Where would you like to connect from". Since you're going to use this locally, just click "Add my current ip address".
11) Then click on "Finish and close". It will take 1-3 minutes.
12) Once it is finished, click on "connect".
13) Choose "connect your application". There you will see your MONGO_URI, copy and paste it in your .env.