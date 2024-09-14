import mongoose from "mongoose";

const MeetingSchema = new mongoose.Schema({
    calendar_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Calendar', required: true },
    organizer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    location: { type: String, required: false },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Meeting', MeetingSchema);

