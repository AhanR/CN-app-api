import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    userName : {type : String, require : true},
    userId : {type : mongoose.SchemaTypes.ObjectId, require : true},
    userKey : String,
    userDomain : {type : String, default : "non-member"},
    lastCalled : Date
})

userSchema.methods.inDomain = async function(domain : String) {
    return await this.find({userDomain : domain});
}

export default mongoose.model("users", userSchema);