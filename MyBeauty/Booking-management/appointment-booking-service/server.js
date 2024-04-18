require('dotenv').config();

const { Sequelize } = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');
const Appointment = require('./appointmentModel');

const app = express();
const port = 8070;

app.use(bodyParser.json());

Appointment.sequelize.sync().then(() =>{
    console.log('Database and tables created successfully');
});

//Getting appointments
app.get('/appointments', async (req, res) => {
    try {
        const { upcoming, email } = req.query;
        let whereCondition = {};

        if (upcoming === 'true') {
            const now = new Date();
            const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

            whereCondition.appointmentDate = {
                [Sequelize.Op.gte]: now,
                [Sequelize.Op.lt]: tomorrow,
            };
        }

        if (email) {
            whereCondition.email = email; 
        }

        const appointments = await Appointment.findAll({
            where: whereCondition,
            order: [['appointmentDate', 'ASC']],
        });

        res.status(200).send(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).send(error);
    }
});

//Appointment retriving API (based on Id )
app.get('/appointments/:id', async(req, res) => {
    const { id } = req.params;

    try {
        const appointment = await Appointment.findOne({ where: {id}});

        if (!appointment) {
            return res.status(404).send({ message: 'Appointment not found'});
        }
        res.status(200).send(appointment);
    }catch (error) {
        console.log('Error happening appointment', error);
        res.status(500).send(error);
    }
});

//Appointment creating API
app.post('/appointments', async (req, res) => {
    try {
        const {name, service, phoneNumber, email, appointmentDate} = req.body;
        const newAppointment = await Appointment.create({name, service, phoneNumber, email, appointmentDate});
        res.status(201).send(newAppointment);
    }catch(error){
        console.log('Can not booking appointment', error);
        res.status(500).send(error);
    }
});

//Appointment updating API
app.put('/appointments/:id', async (req, res) =>{
    const { id } = req.params;
    const { name, service, phoneNumber, email, appointmentDate} = req.body;

    try {
        const appointment = Appointment.findAll({where: {id}});
        
        if(!appointment) {
            return res.status(404).send({ message: 'Appointment not found'});
        }

        appointment.name = name;
        appointment.service = service;
        appointment.phoneNumber = phoneNumber;
        appointment.email = email;
        appointment.appointmentDate = appointmentDate;

        await appointment.save();
        res.status(200).send(appointment);
    }catch (error) {
        console.error('Appointment can not update', error);
        res.status(500).send(error);
    }
});

//Appointment deleting API
app.delete('/appointments/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Appointment.destroy({ where: { id }});

        if(result === 0){
            return res.status(404).send({ message: 'Appointment not found'});
        }

        res.status(200).send({message: 'Appointment deleted successfully'});
    }catch(error) {
        console.log('Appointment can not delete', error);
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
