const db = require('../../db');
const jwt = require('jsonwebtoken');

const handleLogout = async (req, res) => {

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;
    try {
        const sqlSelect = "SELECT * FROM users WHERE refresh_token=$1;";
        db.query(sqlSelect, [refreshToken], async (err, result) => {
            if (err) {
                return res.sendStatus(500).json({'message ' : err.sqlMessage})
            }
            const foundUser = result.rows[0];
            if (!foundUser) {
                res.clearCookie('jwt', { httpOnly: true, maxAge: 24*60*60*1000});
                return res.sendStatus(403)
            }

            const sqlUpdate = 'UPDATE users SET refresh_token = NULL WHERE username=$1;';
            db.query(sqlUpdate, [foundUser.username], (err, result) => {
                if (err) return res.sendStatus(500).json({'message ' : err.sqlMessage});
                res.clearCookie('jwt', { httpOnly: true, maxAge: 24*60*60*1000}); //should add secure:true
                res.sendStatus(204);  
            })
            
        })
    } catch (err) {
        res.status(500).json({'message' :  err.message})
    }
}

module.exports = handleLogout