const Message = require("../models/messages.model.js");
const helper = require("../helper/validator");

exports.create = (req, res) => {
      helper.validator(req, res, ['content', 'sendingDate']);
    
      const message = new Message({
        content: req.body.content,
        sendingDate: req.body.sendingDate
      });

      Message.create(message, (err, data) => {
        if (err) res.status(500).send({error: err.message || "Une erreur est survenue."});
        else res.send(data);
      })
}

exports.findAll = (req, res) => {
    Message.getAll((err, data) => {
        if (err)
            res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving customers."
      });
      else res.send(data);
    })
}

exports.delete = (req, res) => {
  helper.validator(req, res, ['messageId'], 'OTHER');

  Message.remove(req.params.messageId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          error: `Not found message with id ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          error: "Could not delete message with id " + req.params.customerId
        });
      }
    } else res.status(204).send();
  })
}
