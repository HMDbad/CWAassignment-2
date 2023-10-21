const db = require("../models");
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create phone
exports.create = (req, res) => {
  const phone = {
    name: req.body.name,
    number: req.body.number,
    contactId: req.params.contactId,
  };
};

// Get all phones for a parrticular contact
exports.findAll = (req, res) => {
  const contactId = req.params.contactId;
  Phones.findAll({ where: { contactId: contactId } })
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Get one phone by id
exports.findOne = (req, res) => {};

// Update one phone by id
exports.update = (req, res) => {};

// Delete one phone by id
exports.delete = (req, res) => {};
