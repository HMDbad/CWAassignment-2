module.exports = app => {
    const contacts = require("../controllers/contact.controller.js");
  
    var router = require("express").Router();
    // Create a new Contact
    router.post("/contacts/", contacts.create);
  
    // Retrieve all Contacts
    router.get("/contacts/", contacts.findAll);
  
    // Retrieve a single Contact with id
    router.get("/contacts/:contactId", contacts.findOne);
  
    // Update a Contact with id
    router.put("/contacts/:contactId", contacts.update);
  
    // Delete a Contact with id
    router.delete("/contacts/:contactId", contacts.delete);
  

    app.use('/api', router);
    // app.use('/api/contacts', router);
};