const db = require('../db');

const deleteItem = async  (req, res) => {
    const id = req.params['id'];


    try {
        const sqlDelete = "DELETE FROM products WHERE id = $1;";
        db.query(sqlDelete, [id], (err, result) => {
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            } else {
                return res.sendStatus(201)
            }
        })
    } catch (err) {
        res.sendStatus(500)
    }
}

module.exports = deleteItem