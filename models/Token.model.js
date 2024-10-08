import mongoose from "mongoose";

const tokenSchema= new mongoose.Schema({
    githubId:{
        type:String,
        required:true,
        unique:true,
    },
    githubUsername:{
        type:String,
        
    },
    accessToken:{
        type:String,
        required:true,
    }
},{timestamps: true});
 const Token=mongoose.model("Token",tokenSchema)
 export default Token;