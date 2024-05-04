# Project QuickScopes

## Please keep in mind

    I am far from amazing at this, and nothing here is set in stone, so everything is subject to change as project grows and new things are learnt

## Goal

    Create a Peer-to-Peer Rental Marketplace for Telescopes

## Why the Rewrite?

    1. Make the project more suitable for other people to contribute to

    2. TypeScript instead of JavaScript

    3. Limit the number of frameworks
    
    4. Create Project from a more relaxed environment, ie out of interest rather than a requirement for a coding bootcamp
    
    5. Feels good to start from square one

### Original Project Links

    Client: [https://github.com/Teesgit123/capstone-client](https://github.com/Teesgit123/capstone-client)
    Server: [https://github.com/Teesgit123/capstonebaby-server](https://github.com/Teesgit123/capstonebaby-server)

### Original Project Stack

    Client:
      - JavaScript
      - React

   Server:
      - Node.js
      - Express
      - MySQL

    Original Dependencies:
      - argon2
      - jsontwebtoken
      - knex
      - socketio
      - googlemaps
      - sass
      - axios

### New Project Stack

    Client: 
      - TypeScript
      - React
    
    Server:
      - nodejs
      - mySQL (subject to change)
  
#### Pages

    - signup (general)
    - login (general)

    - Current Inventory (Telescope Owner)
    - Past Bids (Telescope Owner)
    - Past Rentals (Telescope Renter)

    - Add a telescope (Telescope Owner)
    - Remove a telescope (Telescope Owner)
    - Cancel a bid (Telescope Renter)

    - Direct Messages (Telescope Owner and Renter)

    - Dashboard (Telescope Renter)
    - Dashboard (Telescope Owner)

#### Data

    Signup
      - username
      - password
      - email
        goal: send username, password, email information to signup

    Login
      - username
      - password
        goal: send username and password to our backend, allowing user to login

    Post a Telescope
      - username (id)
      - telescope details (id, specs)
      - offer details (minimum, expiry date)
      - goal: Submit information about a user's telescope and who the user is

    Rent out a Telescope
      - username
      - bid (amount, time of bid)
      - telescope (id, current bid)
      goal: send information about the rental bid, place the bid in the current list of bids
