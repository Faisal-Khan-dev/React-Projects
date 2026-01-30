import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["customer", "bank-officer", "admin"],
        default: "customer"
    },
    bankId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bank",
    },
},
    { timestamps: true }
)

const UserModel = mongoose.model("user", UserSchema)

export default UserModel