const redisCli = require('../services/redis')
const writter = require('../services/writter')

const Controller = {
    Send: async (req, res, Ws) => {
        const { message, owner } = req.body
        const payload = {}

        if (message === undefined || message === null || message === "") {
            return res.status(400).json({ success: false, message: "message is empty" })
        }

        if (owner === undefined || owner === null || owner === "") {
            return res.status(400).json({ success: false, message: "owner is empty" })
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

        return res.json({
            success: true,
            key: keyFormat,
            payload: JSON.parse(value),
        })
    },
    Histories: async (req, res) => {
        const payload = []
        try {
            const keys = await redisCli.keys("MESSAGE-*")
            const value = await redisCli.mGet(keys)
            value.forEach((result) => payload.push(JSON.parse(result)))
            payload.sort((a, b) => (a.timestamp < b.timestamp) ? -1 : ((a.timestamp > b.timestamp) ? 1 : 0))
            return res.json({
                success: true,
                payload: payload,
                request_time: new Date
            })
        } catch (error) {
            console.log("Histories().error", error)
            return res.status(404).json({
                success: false,
                payload: payload,
                request_time: new Date
            })
        }

    },
    validateAndSetUser: async (req, res) => {

        const { user } = req.body

        if (user === undefined || user === null || user === "") {
            return res.status(400).json({ success: false, message: "user is empty", request_time: new Date })
        }

        let isExist = await writter.checkUser(user)

        if (isExist) {
            return res.status(200).json({
                success: false,
                message: "user is exist",
                request_time: new Date
            })
        }

        await writter.writeUser(user)

        return res.status(200).json({
            success: true,
            message: "user is not exist",
            request_time: new Date
        })
    }
}

module.exports = Controller