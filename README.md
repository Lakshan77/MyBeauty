# MyBeauty: Appointment Booking System for beauty salon

MyBeauty is a appointment booking system for beauty salons designed to streamline the process of scheduling Beauty services appointments. It features a web interface for clints and a backend for managing appointments, including automated email reminders to ensure clints stay informed about their upcoming visits.

## Architecture Overview

MyBeauty has designed based on the Backend for Frontend (BFF) pattern to create a seamless connection between the frontend web application and the backend services. The architecture has two primary domains:

- **Web Portal**: Handles user interactions and presents a responsive interface for appointment management.
- **Appointment Management**: Backend domain that orchestrates appointment scheduling, reminders, and database interactions.