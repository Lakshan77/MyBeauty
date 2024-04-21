import axios from 'axios';

const APPOINTMENT_SERVICE_URL = '/choreo-apis/webportal/bff-service/appointments-5c6/v1.0/create-appointment';

export const bookAppointment = async (appointmentDetails) => {
    try {
        const response = await fetch(`${APPOINTMENT_SERVICE_URL}/create-appointment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointmentDetails),
        });

        if(!response.ok) {
            const message = `Error happening: ${response.status}`;
            throw new Error(message);
        }

        const result = await response.json();
        return result;
    }catch (error) {
        throw error;
    }
};

export const getUpcomingAppointments = async (email) => {
    try {
        const response = await axios.get(`${APPOINTMENT_SERVICE_URL}/appointments`, {
            params: {
                email: email,
                upcoming: 'true',
            }
        });
        return response.data;
    }catch (error){
        console.error('Error happening upcoming appointments:', error);
        throw error;
    }
};
