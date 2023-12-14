const db = require('../db');

const getItem = async (req, res) => {
    const id = req.params['id'];
    try {
        const sqlSelect = "SELECT * FROM products WHERE id = $1;";
        db.query(sqlSelect, [id], async (err, result) => {
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            }
            const result_parsed= result.rows[0];
            res.send(result_parsed);  
        })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

module.exports = getItem