const db = require("../models");
const Contacts = db.contacts;
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create contact
// when i press the button(id="CreateContact"), it should create a contact
// with the name that is in the input field(id="inputfield")
exports.create = (req, res) => {
    const contact = {
        name: req.body.name,
    };

Contacts.create(contact)
.then((data) =>res.send(data))
.catch((err) => {
    res.status(500).send({
        message:
        err.message || "Some error occurred while creating the Contact.",
    });
});
    
};

// 17th october
// exports.create = (req, res) => {
//     // Validate request
//     if (!req.body.firstName) {
//         res.status(400).send({
//             message: "First name can not be empty!"
//         });
//         return;
//     }

//     // Create a Contact
//     const contact = {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         address: req.body.address,
//         city: req.body.city,
//         state: req.body.state,
//         zip: req.body.zip,
//         country: req.body.country
//     };

//     // Save Contact in the database
//     Contacts.create(contact)
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//             message:
//                 err.message || "Some error occurred while creating the Contact."
//             });
//         });
// }

// Get all contacts
exports.findAll = (req, res) => {
    Contacts.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Get one contact by id
exports.findOne = (req, res) => {
  
};

// Update one contact by id
exports.update = (req, res) => {
    
};

// Delete one contact by id
exports.delete = (req, res) => {
    
};
