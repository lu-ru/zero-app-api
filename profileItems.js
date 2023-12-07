const db = require('./db');

const profileItems = async (req, res) => {
    const id = req.params['id'];
    try {
        const sqlSelect = "SELECT * FROM products WHERE seller_id = ?;";
        db.query(sqlSelect, id, async (err, result) => {
            if (err) {
                return res.status(500).json({'message' :  err.message})
            }
            const result_parsed= JSON.parse(JSON.stringify(result));
            res.send(result_parsed);  
        })
    } catch (err) {
        res.status(500).json({'message' :  err.message})
    }
}

module.exports = profileItems