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
  console.log("finding all phones for a particular contact");
  const contactId = req.params.contactId;
  Phones.findAll({ where: { contactId: contactId } })
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Get one phone by id
exports.findOne = (req, res) => {
  const phoneId = req.params.phoneId;

  Phones.findByPk(phoneId)
    .then((phone) => {
      if (!phone) {
        res.status(501).send({
          message: `Phone with id=${phoneId} not found`,
        });
      } else {
        res.send(phone);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: `Error retrieving phone with id=${phoneId}: ${error}`,
      });
    });
};

// Update one phone by id
exports.update = (req, res) => {
  const phoneId = req.params.phoneId;
  Phones.findByPk(phoneId)
    .then((phone) => {
      if (!phone) {
        // If the phone record is not found
        res.status(500).send({ message: "Phone not found" });
      } else {
        // Update the phone record's properties with data from the request body
        phone.name = req.body.name;
        phone.number = req.body.number;

        // Save the updated phone record
        phone
          .save()
          .then(() => {
            // Send a success response with the updated phone record
            res.send({
              message: "Phone updated successfully",
              updatedPhone: phone,
            });
          })
          .catch((err) => {
            // Handle any errors that occur during the save operation
            res.status(500).send({ message: err.message });
          });
      }
    })
    .catch((err) => {
      // Handle any errors that occur during the find operation
      res.status(500).send({ message: err.message });
    });
};

// Delete a single phone by its Id
exports.delete = (req, res) => {
  const phoneId = req.params.id;

  Phones.destroy({
    where: { id: phoneId },
  })
    .then((numDeleted) => {
      if (numDeleted === 1) {
        res.send({ message: "Phone was deleted successfully." });
      } else {
        res.send({ message: `Cannot delete phone with id=${phoneId}.` });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .send({ message: `Error deleting phone with id=${phoneId}: ${error}` });
    });
};
