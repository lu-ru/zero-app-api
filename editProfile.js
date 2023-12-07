const db = require('./db');


const editProfile = async  (req, res) => {
    const {user, address} = req.body;
    if (!user || !address ) return res.sendStatus(400).json({'message' : 'Some data is missing'});
    try {
        const sqlUpdate = "UPDATE users SET address = ? WHERE username=?;";
        db.query(sqlUpdate, [address, user], (err, result) => {
            if (err?.code) {
                return res.sendStatus(400);
            }
            return res.status(201).json({'message' : 'Profile updated'})
        })
    } catch (err) {
        res.status(500).json({'message' :  err.message})
    }
}

module.exports = editProfile