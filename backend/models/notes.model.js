import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Types.ObjectId,
        ref: "Job"
    },
    content: {
        type: String,
        default: ""
    }
})

const Note = mongoose.model("Note", noteSchema);

export default Note;