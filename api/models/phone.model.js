module.exports = (sequelize, Sequelize) => {
    const Phone = sequelize.define("phone", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        // DEFINE YOUR MODEL HERE
        name: {
            type: Sequelize.STRING,
        },

        number: {
            type: Sequelize.INTEGER,
            allowNull: false
        },        
        
        contactId: {
            type: Sequelize.INTEGER,
            refrences: {
                model: 'contacts',
                key: 'id'
            }
        },

    });
  
    return Phone;
};