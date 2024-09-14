import mongoose from "mongoose";

const BlacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        expires: 3600 // Optional: tokens will automatically be removed after 1 hour
    }
});

export default mongoose.model('BlacklistToken', BlacklistTokenSchema);
