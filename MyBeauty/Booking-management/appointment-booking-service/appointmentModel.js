const sequelize = require('./database');
const { DataTypes } = require('sequelize');

const Appointment = sequelize.define('Appointment', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    service: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    AppointmentDate: {
        type: DataTypes.DATE,
        allowNull: false,
    }
});

module.exports = Appointment;