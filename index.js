import express from "express"

import connectDb  from "./config/db.js"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import calendarRoutes from "./routes/calendar.js"
import meetingRoutes from "./routes/meeting.js"


const app  = express();
dotenv.config()
app.use(express.json());



connectDb();



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/calendars', calendarRoutes);
app.use('/api/meetings', meetingRoutes);

const PORT  = process.env.PORT || 8800
app.listen(PORT,()=>{
    console.log(`server is running on  port  ${PORT}`);
    
})