const axios = require('axios')

const authenticate = async(tokenUrl, clientId, clientSecret) => {
    try {
        const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

        const response = await axios.post(tokenUrl, 'grant_type=client_credentials', {
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${credentials}`
            },
        });

        const { access_token } = response.data;
        return access_token;
    }catch (error) {
        console.log('Authentication failed:', error);
        throw error;
    }
};

module.exports = authenticate;