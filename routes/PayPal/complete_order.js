const ppAccessToken = require('./ppAccessToken');
const axios = require('axios');

function completeOrder(req, res) {
    ppAccessToken()
        .then((accessToken) => {
            console.log(accessToken)
            const { order_id } = req.body
            console.log(order_id)
            try {
                const response = axios.post(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${order_id}/capture`,
                    {}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
                return res.send(response.data)
            } catch (err) {
                console.log('err')
            }
        }
        )
}

module.exports = completeOrder