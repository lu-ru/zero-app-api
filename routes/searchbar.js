const db = require('../db');

const searchbar = async (req, res) => {
    const category = req.params['category'];
    const query = req.params['query'];
    try {
        const sqlSelect = "SELECT * FROM products WHERE itemcategory = $1 AND (itemname LIKE  $2  OR itemdescription LIKE  $2 );";//Inefficient?
        db.query(sqlSelect, [category, `\%${query}\%`], async (err, result) => {
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

module.exports = searchbar