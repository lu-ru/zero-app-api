const db = require('./db');

const addItem = async  (req, res) => {
    console.log(req.body)
    const today = new Date();
    console.log(today);
    const {itemName, itemPrice, itemDescription, itemCategory, id} = req.body;
    if (!itemName || !itemPrice || !itemCategory || !id ) return res.sendStatus(400).json({'message' : 'Something is missing!'});


    try {
        const sqlInsert = "INSERT INTO products (itemName, itemPrice, itemDescription, itemCategory, seller_id, inserted_date) VALUES (?, ?, ?, ?, ?, ?);";
        db.query(sqlInsert, [itemName, itemPrice, itemDescription, itemCategory, id, today], (err, result) => {
            if (err) {
                console.log(err.sqlMessage)
                return res.sendStatus(500);
            }
            return res.status(201).json({'message' : 'Item Added'})
        })
    } catch (err) {
        console.log(err)
        res.sendStatus(500).json({'message' :  err.message})
    }
}

module.exports = addItem