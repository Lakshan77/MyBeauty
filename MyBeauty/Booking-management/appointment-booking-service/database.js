const {Sequelize} = require('sequelize')

const sequelize = new Sequelize (
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT,
    }
);

sequelize.authenticate().then (() => {
    console.log('Connection has been created successfully');
}).catch(err => {
    console.log('Unable to connect to the database:', err);
});

module.exports = sequelize;