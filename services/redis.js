const redis = require('redis')


const RedisCli = () => {
    const client = redis.createClient({
        host: '127.0.0.1',
        port: '6379'
    });
    client['auth'] = null;
    client.connect()
    return client

};

module.exports = RedisCli()