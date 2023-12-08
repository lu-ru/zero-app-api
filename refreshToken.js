const db = require('./db');
const jwt = require('jsonwebtoken');

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    try {
        const sqlSelect = "SELECT * FROM users WHERE refresh_token=$1;";
        db.query(sqlSelect, [refreshToken], async (err, result) => {
            if (err) {
                return res.status(500).json({'message' :  err.message})
            }
            const foundUser = result.rows[0];
            
            if (!foundUser) return res.status(403).json()
            jwt.verify(
                refreshToken, 
                process.env.REFRESH_TOKEN_SECRET,
                (err, decoded) => {
                    if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
                    const accessToken = jwt.sign(
                        { 'username': decoded.username },
                        process.env.ACCESS_TOKEN_SECRET,
                        {expiresIn: '30s'}
                    );
                    res.json({accessToken})
                })
        })
    } catch (err) {
        res.status(500).json({'message' :  err.message})
    }
}

module.exports = handleRefreshToken