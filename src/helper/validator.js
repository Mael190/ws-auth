exports.validator = (req, res, fields, method='POST') => {
    const toValidate = method === 'POST' ? Object.keys(req.body) : Object.keys(req.params);
    const fieldsSorted = fields.slice().sort();

    if(!(toValidate.length === fields.length && toValidate.slice().sort().every(function(value, index) {return value === fieldsSorted[index];}))) {
        return res.status(400).json({error: "Un ou plusieurs champs n'a pas été renseigné."})
    }
}