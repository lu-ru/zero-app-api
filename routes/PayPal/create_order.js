const ppAccessToken = require('./ppAccessToken');
const axios = require('axios');
const {
    v1: uuidv1
} = require('uuid');

// https://api-m.sandbox.paypal.com

const createOrder = (req, res) => {
    ppAccessToken()
        .then(async (accessToken) => {
            let order_data_json = {
                "intent": "CAPTURE",
                "purchase_units": [
                    {
                        "amount": {
                            "currency_code": "USD",
                            "value": "100"
                        }
                    }
                ]
            }
            console.log(accessToken)
            const data = JSON.stringify(order_data_json);
            try {
                const response = await axios.post('https://api-m.sandbox.paypal.com/v2/checkout/orders',
                    data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'PayPal-Request-Id': uuidv1()
                    },
                }
                )
                const tosend = response.data.id
                return res.send(tosend)
            } catch (err) {
                console.log('err')
            }
            return
        })
}

module.exports = createOrder 