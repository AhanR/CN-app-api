import mongoose, { Schema } from "mongoose";

const eventSchema : Schema = new Schema({
    eventName : {type : String, require: true},
    eventDate : {type : Date, default : Date.now},
    eventInvitees : {type : [mongoose.SchemaTypes.ObjectId], ref : "users"},
    eventAttendees : [
        {
            user : {type : mongoose.SchemaTypes.ObjectId, ref : "users"},
            signee : {type : mongoose.SchemaTypes.ObjectId, ref : "users"}
        }
    ],
    eventId : {type : String},
    eventDomain : {type : mongoose.SchemaTypes.ObjectId, ref : "domains"},
    eventAuthor : {type : mongoose.SchemaTypes.ObjectId, ref : "users"}
})

export default mongoose.model("event", eventSchema);