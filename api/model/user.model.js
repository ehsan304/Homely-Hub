import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://images.app.goo.gl/abUqKqiuMM7RxfAw6"
    }
}, {
    timestamps: true
})


const User = mongoose.model('User', userSchema)

export default User