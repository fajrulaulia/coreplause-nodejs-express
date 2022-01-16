const redisCli = require('../services/redis')

const Controller = {
    Send: async (req, res, Ws) => {
        const { message, owner } = req.body
        const payload = {}

        if (message === undefined || message === null || message === "") {
            res.status(400).json({ success: false, message: "message is empty" })
            res.end()
        }

        if (owner === undefined || owner === null || owner === "") {
            res.status(400).json({ success: false, message: "owner is empty" })
            res.end()
        }

        const dateTime = new Date

        payload['success'] = true
        payload['message'] = message
        payload['owner'] = owner
        payload['timestamp'] = dateTime

        const keyFormat = 'MESSAGE-' + owner + "-" + Date.parse(dateTime)

        await redisCli.set(keyFormat, JSON.stringify(payload));

        const value = await redisCli.get(keyFormat);

        Ws.clients.forEach(client => client.send('COREPLAUSE::UPDATE_MESSAGE'));

        res.json({
            success: true,
            key: keyFormat,
            payload: JSON.parse(value),
        })
    },
    Histories: async (req, res) => {
        const keys = await redisCli.keys("MESSAGE-*")
        const value = await redisCli.mGet(keys)
        const payload = []
        value.forEach((result) => payload.push(JSON.parse(result)))
        payload.sort((a, b) => (a.timestamp < b.timestamp) ? -1 : ((a.timestamp > b.timestamp) ? 1 : 0))
        res.json({
            success: true,
            payload: payload,
            request_time: new Date
        })
    },
}

module.exports = Controller