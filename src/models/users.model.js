const sql = require('./db.js');

class Message {
    constructor(user) {
        t = this;
        t.name = user.name;
        t.password = user.password;
        t.avatar = user.avatar;
        t.creationDate = new Date().toLocaleString();
        t.seen = user.seen;
        t.role = user.role;
    }
    static create(newUser, result) {
        sql.query("INSERT INTO messages SET ?", newUser, (err, res) => {
            err ? result(err, null) : result(null, { id: res.insertId, ...newMessage });
        });
    }
}

module.exports = Message;


