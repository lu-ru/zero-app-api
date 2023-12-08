const bcrypt = require('bcrypt');
const db = require('./db');


const signUp = async  (req, res) => {
    const {user, pwd} = req.body;
    if (!user || !pwd ) return res.sendStatus(400).json({'message' : 'Username and Password are required'});
    const hashedPwd = await bcrypt.hash(pwd, 10);

    try {
        const sqlInsert = "INSERT INTO users (username, password) VALUES ($1, $2);";
        db.query(sqlInsert, [user, hashedPwd], (err, result) => {
            if (err?.code==='ER_DUP_ENTRY') {
                return res.sendStatus(409);
            } else if (err?.code) {
                console.log(err)
                return res.sendStatus(401);
            }
            return res.status(201).json({'message' : 'New User Created'})
        })
    } catch (err) {
        res.status(500).json({'message' :  err.message})
    }
}

module.exports = signUp