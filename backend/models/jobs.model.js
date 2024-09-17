import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({

    clientName: {
        type: String,
        required: true,
    },
    contactInfo: {
        type: Number,
        required: true,
    },
    receivedDate: {
        type: Date,
        required: true,
    },
    inventoryReceived: {
        type: String,
        required: true,
    },
    inventoryImage: {
        type: String,
        default: "",
    },
    reportedIssues: {
        type: String,
        required: true,
    },
    clientNotes: {
        type: String,
        required: true,
    },
    assignedTechnician: {
        type: String,
        required: true,
    },
    Deadline: {
        type: Date,
        required: true,
    },
    estimatedAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
}, {timestamps: true})

const Job = mongoose.model("Job", jobSchema);

export default Job;