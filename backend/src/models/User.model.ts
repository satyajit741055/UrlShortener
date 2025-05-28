/* Each document should store:

name – (optional) user's full name

email – unique and required

password – hashed

createdAt – auto timestamp

updatedAt – auto timestamp 

🧠 Optional:

urls – list of ObjectIds referencing shortened URLs (if you want to query user-specific data easily) */


import mongoose, { Schema, Document, Types } from "mongoose";

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    urls?: Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}


const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    urls: [{
        type: Types.ObjectId,
        ref: 'Url'
    }],
    },
    { timestamps: true }
)



const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', UserSchema);

export default UserModel;