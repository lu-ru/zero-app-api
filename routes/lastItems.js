const db = require('../db');

const lastItems = async (req, res) => {
    try {
        const sqlSelect = "SELECT * FROM products order by inserted_date desc;";
        db.query(sqlSelect, async (err, result) => {
            if (err) {
                return res.status(500).json({'message ' : err.sqlMessage})
            }
            const result_parsed= result.rows;
            res.send(result_parsed);  
        })
    } catch (err) {
        res.status(500).json({'message' :  err.message})
    }
}

module.exports = lastItems