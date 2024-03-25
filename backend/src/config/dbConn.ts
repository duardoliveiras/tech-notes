import mongoose from "mongoose";

export const connectDB = async (uri : string) => {
    try{
        console.log("Connecting to database...", uri);
        await mongoose.connect(uri);
    }catch(err){
        console.log(err);
    }
}