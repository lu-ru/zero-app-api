const db = require('../db');

const profileItems = async (req, res) => {
    const id = req.params['id'];
    try {
        const sqlSelect = "SELECT * FROM products WHERE seller_id = $1;";
        db.query(sqlSelect, [id], async (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({'message ' : err.sqlMessage})
            }
            const result_parsed= result.rows;
            res.send(result_parsed);  
        })
    } catch (err) {
        res.status(500).json({'message' :  err})
    }
}

module.exports = profileItems