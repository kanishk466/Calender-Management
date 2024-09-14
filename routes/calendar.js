import express from "express"
const router = express.Router();
import Calendar from "../models/Calender.model.js"

import authMiddleware from "../middleware/authMiddleware.js"


router.get('/', authMiddleware, async (req, res) => {
    try {
        const calendars = await Calendar.find({ user: req.user.id });
        res.json(calendars);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create Calendar
router.post('/', authMiddleware, async (req, res) => {
    const { name } = req.body;
    const user_id = req.user.id;

    try {
        const calendar = new Calendar({ name, user_id });
        await calendar.save();
        res.json(calendar);
    } catch (error) {
        res.status(400).json({ message: 'Error creating calendar' });
    }
});

// Update Calendar
router.put('/:id', authMiddleware, async (req, res) => {
    const { name } = req.body;

    try {
        const calendar = await Calendar.findByIdAndUpdate(req.params.id, { name }, { new: true });
        res.json(calendar);
    } catch (error) {
        res.status(400).json({ message: 'Error updating calendar' });
    }
});

// Delete Calendar
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Calendar.findByIdAndDelete(req.params.id);
        res.json({ message: 'Calendar deleted' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting calendar' });
    }
});




export default router