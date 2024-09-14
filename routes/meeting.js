import express from "express"
const router = express.Router();
import Meeting from "../models/Meeting.model.js"



import authMiddleware from "../middleware/authMiddleware.js"



// Get the details of a specific meeting
router.get('/details/:meetingId', authMiddleware, async (req, res) => {
    const { meetingId } = req.params;
    
    try {
        const meeting = await Meeting.findById(meetingId);
        if (!meeting) {
            return res.status(404).json({ message: 'Meeting not found' });
        }
        res.json(meeting);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all meetings for a specific calendar
router.get('/:calendarId', authMiddleware, async (req, res) => {
    const { calendarId } = req.params;
    
    try {
        const meetings = await Meeting.find({ calendar: calendarId });
        res.json(meetings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


// Create Meeting



router.post('/:calendarId', authMiddleware, async (req, res) => {
    const { title, start_time, end_time, location, attendees } = req.body;
    const calendar_id = req.params.calendarId;
    const organizer_id = req.user.id;

    try {
        const meeting = new Meeting({ title, start_time, end_time, location, attendees, calendar_id, organizer_id });
        await meeting.save();
        res.json(meeting);
    } catch (error) {
        res.status(400).json({ message: 'Error creating meeting' });
    }
});

// Update Meeting (Organizers only)
router.put('/:meetingId', authMiddleware, async (req, res) => {
    const meeting = await Meeting.findById(req.params.meetingId);
    if (meeting.organizer_id.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Only organizers can update the meeting' });
    }

    const updates = req.body;
    try {
        const updatedMeeting = await Meeting.findByIdAndUpdate(req.params.meetingId, updates, { new: true });
        res.json(updatedMeeting);
    } catch (error) {
        res.status(400).json({ message: 'Error updating meeting' });
    }
});



router.put('/reschedule/:meetingId', authMiddleware, async (req, res) => {
    const { start_time, end_time } = req.body;
    
    try {
        const meeting = await Meeting.findById(req.params.meetingId);
        if (!meeting || meeting.organizer.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Only the organizer can reschedule the meeting' });
        }

        meeting.start_time = start_time;
        meeting.end_time = end_time;
        await meeting.save();
        res.json(meeting);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});



router.put('/update-location/:meetingId', authMiddleware, async (req, res) => {
    const { location } = req.body;
    
    try {
        const meeting = await Meeting.findById(req.params.meetingId);
        if (!meeting || meeting.organizer.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Only the organizer can update the location' });
        }

        meeting.location = location;
        await meeting.save();
        res.json(meeting);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});




export default router;