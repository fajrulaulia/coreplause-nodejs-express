const redis = require('redis')

require('dotenv').config()

const RedisCli = () => {
    const config = {}
    if (!(process.env.REDIS_HOST === undefined || process.env.REDIS_HOST === null || process.env.REDIS_HOST === "")) {
        config.host = process.env.REDIS_HOST
    }

    if (!(process.env.REDIS_USER === undefined || process.env.REDIS_USER === null || process.env.REDIS_USER === "")) {
        config.username = process.env.REDIS_USER
    }

    if (!(process.env.REDIS_PASS === undefined || process.env.REDIS_PASS === null || process.env.REDIS_PASS === "")) {
        config.password = process.env.REDIS_PASS
    }

    if (!(process.env.REDIS_PORT === undefined || process.env.REDIS_PORT === null || process.env.REDIS_PORT === "")) {
        config.port = process.env.REDIS_PORT
    }

    const client = redis.createClient(config)
    client['auth'] = null;
    client.connect()
        .then(() => {
            console.log(`[LOG.INFO] Redis client connected, host=${process.env.REDIS_HOST}, port=${process.env.REDIS_PORT}`)
        })
        .catch((err) => console.log("[LOG.ERROR] Redis Client can't connected", err.message))
    return client

};

module.exports = RedisCli()