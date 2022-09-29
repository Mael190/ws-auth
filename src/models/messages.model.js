const sql = require('./db.js');

class Message {
    constructor(message) {
        this.content = message.content;
        this.sendingDate = message.sendingDate;
    }
    static create(newMessage, result) {
        sql.query("INSERT INTO messages SET ?", newMessage, (err, res) => {
            err ? result(err, null) : result(null, { id: res.insertId, ...newMessage });
        });
    }
    static getAll(result) {
        sql.query("SELECT * FROM messages", (err, res) => {
            err ? result(err, null) : result(null, res);
        });
    }
    static remove = (id, result) => {
        console.log(id);
        sql.query("DELETE FROM messages WHERE id = ?", id, (err, res) => {
            if (err) {
                console.log(err)
                result(null, err);
                return;
              }
            if (res.affectedRows == 0) {
                result({ error: "not_found" }, null);
                return;
            }
            result(null, res);
        })
    }
}

module.exports = Message;