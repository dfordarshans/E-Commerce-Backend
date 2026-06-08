const Support = require('../Models/SupportModel');

const createTicket = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const ticket = await Support.create({ name, email, message });
        res.status(201).json({ message: 'Ticket submitted successfully', data: ticket });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting ticket', error: error.message });
    }
};

const getAllTickets = async (req, res) => {
    try {
        const tickets = await Support.find().sort({ createdAt: -1 });
        res.status(200).json({ message: 'Tickets fetched successfully', data: tickets });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tickets', error: error.message });
    }
};

module.exports = { createTicket, getAllTickets };
