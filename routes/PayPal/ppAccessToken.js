require('dotenv').config();
const axios = require('axios');
const qs = require('qs');

const client_id = process.env.PP_CLIENT_ID;
const client_secret = process.env.PP_CLIENT_SECRET;
const auth = `${client_id}:${client_secret}`;
let data = qs.stringify({
    'grant_type': 'client_credentials'
});
let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
    },
    data: data
};

async function ppAccessToken() {
    try {
        const response = await axios.request(config);
        const accessToken = response.data.access_token
        return (accessToken)
    }
    catch (error) {
        console.log(error);
    }
}
module.exports = ppAccessToken