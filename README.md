# E-Commerce Esports MERN

REST API Docs: https://documenter.getpostman.com/view/20219898/2s93sc5Czj

# Setup

Add mock products

1. Create a `products` collection in MongoDB Atlas
2. Click Insert Document -> Click `{}`
3. Copy and paste the JSON text from /test/mock-products.json

Start the server

1. Navigate into /server
2. Run `npm install`
3. Create a .env file in /server and set: MONGO_URL, DB_NAME, JWT_SECRET, JWT_LIFETIME
4. Run `npm start`

Start the client

1. Navigate into /client
2. Run `npm install`
3. Run `npm start`

Run script to automate registering users and making reviews

1. Navigate into /test
2. Run `npm install`
3. Run `node test.js`
