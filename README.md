# QuickScopes

## Description
    A peer-to-peer rental marketplace for telescopes. The basic idea is to allow people who own a telescope get more value from them, by creating a platform for them to connect.

## Getting Started
    
    if you have node installed already, the steps to get this thing running are:
        1 - clone the project
        2 - open 2 separate command shells, in the root directory
        3 - use each command shell to have one run the server and the other to run the client
            - ie cd server (for the server) and cd client (for the client) 
        4 - run "npm install" to install dependencies for both the client and server
        5 - create a file in the server directory called '.env':
                - in the file you'll need two variables, PORT and CORS_ORIGIN, PORT specifies which port to run the server locally and CORS_ORIGIN is the url of the client
        5 - once the server has all the dependencies installed, 
            a - run "npm run build" to compile our typescript into javascript for node, followed by "npm start" to launch the compiled server
                or
            b - run "npm run dev" to launch the server via nodemon (nodemon lets us make changes to server without restarting)
        6 - once the client has all the dependencies installed,
            a - run "npm start" to launch the React app via webpack in a development environment
                or
            b - run "npm run build" to launch the React app via webpack in a production environment

