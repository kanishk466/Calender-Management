import mongoose  from "mongoose";

const connectDb = async ()=>{
    try {
        const MONGODB_URI = process.env.MONGODB_URI
        await mongoose.connect(MONGODB_URI , {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected to MongoDB')
        
    } catch (error) {
        console.error('MongoDb connection Failed' , error);
        process.exit(1)
    }
}

export default connectDb ;