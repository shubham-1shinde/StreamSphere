import mongoose, {Schema} from "mongoose";

const messageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

}, {timestamps: true})



export const Message = mongoose.model("Message", messageSchema)