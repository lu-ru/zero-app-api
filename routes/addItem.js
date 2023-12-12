const db = require('../db');

const addItem = async  (req, res) => {
    const today = new Date();
    const {image, itemName, itemPrice, itemDescription, itemCategory, id} = req.body;
    if (!image || !itemName || !itemPrice || !itemCategory || !id ) return res.sendStatus(400).json({'message' : 'Something is missing!'});


    try {
        const sqlInsert = "INSERT INTO products (image_b64, itemname, itemprice, itemdescription, itemcategory, seller_id, inserted_date) VALUES ($1, $2, $3, $4, $5, $6, $7);";
        db.query(sqlInsert, [image, itemName, itemPrice, itemDescription, itemCategory, id, today], (err, result) => {
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            } else {
                return res.sendStatus(201)
            }
        })
    } catch (err) {
        res.sendStatus(500).json({'message ' : err.message})
    }
}

module.exports = addItem