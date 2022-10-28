const crypto = require('crypto');

module.exports = {

    key(){
        const text = crypto.randomBytes(8).toString('hex');
        return text;
    }
}