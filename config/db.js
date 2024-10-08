import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoUri=process.env.MONGODB_URI;
const connectDB=async()=>{
    try {
        await mongoose.connect(mongoUri);
        console.log("MongoDB connected");
        
        
    } catch (error) {
        throw new error
    }
}
export default connectDB;