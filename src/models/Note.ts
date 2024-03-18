import mongoose, { Schema, model, Types } from "mongoose";

const AutoIncrement = require('mongoose-sequence')(mongoose);


interface INote extends Document {
    title: string;
    content: string;
    completed: boolean;
    user: Types.ObjectId;
    ticket: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export const noteSchema : Schema<INote> = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
},  {  // This is to create the createdAt and updatedAt fields
        timestamps: true 
    }
);


noteSchema.plugin(AutoIncrement, 
    {
        inc_field: 'ticket',
        id: 'ticketNums',
        start_seq: 1
    });

const Note = model<INote>('Note', noteSchema);
export default Note;