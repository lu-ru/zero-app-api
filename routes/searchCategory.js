const db = require('../db');

const searchCategory = async (req, res) => {
    const category = req.params['category'];
    try {
        const sqlSelect = "SELECT * FROM products WHERE itemcategory = $1;";
        db.query(sqlSelect, [category], async (err, result) => {
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            }
            const result_parsed= result.rows;
            res.send(result_parsed);  
        })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

module.exports = searchCategory