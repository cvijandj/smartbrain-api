const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controller/register')
const signin = require('./controller/signin')
const profile = require('./controller/profile')
const image = require('./controller/image')

const db = knex({
        client: 'pg',
        connection: {
          host : 'dpg-cds24ag2i3mrfom4bjtg-a', //localhost
          user : 'smartbrain_jpwa_user', //username for my database
          port: 5432, // default port of this database 
          password : 'AOmq4TnB7PeMIIeg9rXX3AZv8YDDtx39', //default password for posgres user on my PC
          database : 'smartbrain_jpwa' //database name
        }
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('-');
})
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt, knex)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt, knex)})
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db, bcrypt, knex)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})
app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})


