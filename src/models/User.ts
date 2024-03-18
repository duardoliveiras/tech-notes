import mongoose, {model, Schema} from "mongoose";

interface IUser extends Document {
    username: string;
    password: string;
    role: string[];
    active: boolean;

}

// Mongoose is a MongoDB object modeling tool.
export const userSchema : Schema<IUser> = new Schema({     
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: [{
        type: String,
        deafult: "Employee"
    }],
    active: {
        type: Boolean,
        default: true
    },

}); 

const User = model<IUser>('User', userSchema);
export default User;
 // Export the model (User) with the schema (userSchema