const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const signUp = require('./routes/JWTs/signUp');
const signIn = require('./routes/JWTs/signIn');
const verifyJWT = require('./routes/JWTs/verifyJWT');
const handleRefreshToken = require('./routes/JWTs/refreshToken');
const handleLogout = require('./routes/JWTs/logout');
const cookieParser = require('cookie-parser');
const editProfile = require('./routes/editProfile');
const addItem = require('./routes/addItem');
const profileItems = require('./routes/profileItems');
const lastItems = require('./routes/lastItems');
const getItem = require('./routes/getItem');
const deleteItem = require('./routes/deleteItem');
const searchCategory = require('./routes/searchCategory');
const searchSearchBar = require('./routes/searchbar');


const whitelist = ['http://localhost:3000']
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
app.use(express.json({limit: '50mb'}));
app.use(cors(corsOption));
app.use(cookieParser())


//Routes
app.post('/register', signUp);
app.post('/login', signIn);
app.get('/refresh', handleRefreshToken);
app.get('/logout', handleLogout);
app.get('/last_items', lastItems);
app.get('/getItem/:id', getItem);
app.get('/search/:category', searchCategory);
app.get('/searchbar/:category/:query', searchSearchBar)

//Verify JWT
app.use(verifyJWT);
app.post('/edit-profile', editProfile);
app.post('/add-item', addItem);
app.get('/:id/profile-items', profileItems);
app.post('/delete/:id', deleteItem);


app.listen(3001, ()=> console.log('Running on 3001'))