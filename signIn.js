const db = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signIn = async (req, res) => {
    const {user, pwd} = req.body;
    if (!user || !pwd ) return res.sendStatus(400).json({'message' : 'Username and Password are required'});

    try {
        const sqlSelect = "SELECT * FROM users WHERE username=?;";
        db.query(sqlSelect, [user], async (err, result) => {
            if (err) {
                return res.status(500).json({'message' :  err.message})
            }
            const foundUser = JSON.parse(JSON.stringify(result))[0];
            if (!foundUser) {
                return res.status(404).json()
            }
            const match = await bcrypt.compare(pwd, foundUser.password);
            const id = foundUser.id;
            if (match){
                const accessToken = jwt.sign(
                    { 'username': foundUser.username },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn : '30s' }
                )
                const refreshToken = jwt.sign(
                    { 'username': foundUser.username },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn : '1d' }
                )
                const sqlUpdate='UPDATE users SET refresh_token = ? WHERE username= ?;';
                db.query(sqlUpdate, [refreshToken, user], (err, result)=>{
                    if (err) {
                        return res.status(500).json({'message' :  err.message})
                    }
                    res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000});
                    return res.json({id, accessToken});
                })
            } else {
                return res.status(401).json();
            }
        })
    } catch (err) {
        res.status(500).json({'message' :  err.message})
    }
}

module.exports = signIn