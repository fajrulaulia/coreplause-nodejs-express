const fs = require('fs');
const source = require('../list.json')


module.exports = {
    writeUser: async (name) => {
        const tempUsers = source
        tempUsers.push(name)

        await fs.writeFile('list.json', JSON.stringify(tempUsers), (err) => {
            if (err) {
                console.log("err", err)
            };
        });
    },
    checkUser: async (name) => {
        const tempUsers = source
        let result = tempUsers.find(o => o === name);
        return result !== undefined
    }
}