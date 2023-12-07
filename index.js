const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const signUp = require('./signUp');
const signIn = require('./signIn');
const verifyJWT = require('./verifyJWT');
const handleRefreshToken = require('./refreshToken');
const handleLogout = require('./logout');
const cookieParser = require('cookie-parser');
const editProfile = require('./editProfile');
const addItem = require('./addItem');
const profileItems = require('./profileItems');
const lastItems = require('./lastItems')


const whitelist = ['https://zero-app-front.onrender.com']
const corsOption = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            console.log(whitelist.indexOf(origin))
            callback(new Error ('Not Allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

//Middleware
app.use(express.json());
app.use(cors(corsOption));
app.use(cookieParser())


//Routes
app.post('/register', signUp);
app.post('/login', signIn);
app.get('/refresh', handleRefreshToken);
app.get('/logout', handleLogout);
app.get('/last_items', lastItems)

//Verify JWT
app.use(verifyJWT);
app.post('/edit-profile', editProfile);
app.post('/add-item', addItem);
app.get('/:id/profile-items', profileItems)


app.listen(3001, ()=> console.log('Running on 3001'))