import mongoose from "mongoose";
import Job from "../models/jobs.model.js";
import Note from "../models/notes.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createJob = async (req, res) => {
    try {
        const { clientName, contactInfo, receivedDate,
            inventoryReceived, reportedIssues,
            clientNotes, assignedTechnician, Deadline, estimatedAmount,
            status

        } = req.body;

        if ([ clientName, contactInfo, receivedDate,
            inventoryReceived, reportedIssues,
            clientNotes, assignedTechnician, Deadline, estimatedAmount,
            status].some((field) => field?.trim() === "")) {

            return res.status(401).json({ error: "All fields are required" })
        }

        // const job = await Job.findOne({ clientId });

        // if (job) {
        //     return res.status(401).json({ error: "clientId already exists try another one" })
        // }

        //Handling Image/Doc/video
        const filesLocalPath = req.files?.inventoryImage[0]?.path;

        if (!filesLocalPath) {
            return res.status(401).json({ error: "Client files are required" })
        }

        const clientFiles = await uploadOnCloudinary(filesLocalPath)

        if (!clientFiles) {
            return res.status(401).json({ error: "something went wrong while uploading files" })
        }

        const newJob = await Job.create({
            clientName: clientName.toLowerCase(),
            contactInfo,
            receivedDate,
            inventoryReceived,
            inventoryImage: clientFiles.url,
            reportedIssues,
            clientNotes,
            assignedTechnician,
            Deadline,
            estimatedAmount,
            status
        })

        if (!newJob) {
            return res.status(401).json({ error: "something went wrong while creating new job" })
        }

        res.status(200).json(newJob);

    } catch (error) {
        console.log("Error in createJob controller", error.message);
        res.status(500).json({ error: "Internal server Error" })
    }
}

export const updateJob = async (req, res) => {
    try {
        const { clientName, contactInfo, receivedDate,
            inventoryReceived, reportedIssues,
            clientNotes, assignedTechnician, Deadline, estimatedAmount,
            status

        } = req.body;

        const { clientId } = req.params;

        if ([clientName, contactInfo, receivedDate,
            inventoryReceived, reportedIssues,
            clientNotes, assignedTechnician, Deadline, estimatedAmount,
            status].some((field) => field?.trim() === "")) {

            return res.status(401).json({ error: "These fields are required" })
        }

        const filesLocalPath = req.file?.path;
        let clientFiles = null;

        if (filesLocalPath) {
            // Upload the file to Cloudinary
            clientFiles = await uploadOnCloudinary(filesLocalPath);

            if (!clientFiles.url) {
                return res.status(401).json({ error: "Error while uploading files" });
            }
        }

        // Build the update data object
        const updateData = {
            clientName: clientName.toLowerCase(),
            contactInfo,
            receivedDate,
            inventoryReceived,
            reportedIssues,
            clientNotes,
            assignedTechnician,
            Deadline,
            estimatedAmount,
            status,
        }

        if (clientFiles) {
            updateData.inventoryImage = clientFiles.url;
        }


        const updatedJob = await Job.findByIdAndUpdate(
            { _id: clientId }, 
            { $set: updateData }, 
            { new: true }
        )

        if (!updatedJob) {
            return res.status(401).json({ error: "There is no job found to be updated" })
        }

        console.log("success");
        res.status(200).json(updatedJob);

    } catch (error) {
        console.log("Error in updateJob controller", error.message);
        res.status(500).json({ error: "Internal server Error" })
    }
}

export const deleteJob = async (req, res) => {
    try {
        const { clientId } = req.params;

        if (!clientId) {
            return res.status(401).json({ error: "clientId is required" })
        }

        const response = await Job.findByIdAndDelete({ _id: clientId });
        if (!response) {
            return res.status(401).json({ error: "Client not found" })
        }

        return res.status(200).json("Client deleted successfully")

    } catch (error) {
        console.log("Error in deleteJob controller", error.message);
        res.status(500).json({ error: "Internal server Error" })
    }
}

export const getOneJob = async (req, res) => {
    try {

        const { clientId } = req.params;

        if (!clientId) {
            return res.status(400).json({ error: "clientId is required" });
        }

        // Ensure clientId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(clientId)) {
            return res.status(400).json({ error: "Invalid clientId format" });
        }

        const getJob = await Job.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(clientId) // Ensure _id is properly matched
                }
            },
            {
                $lookup: {
                    from: "notes", 
                    localField: "_id", 
                    foreignField: "userId", 
                    as: "detail" 
                }
            },
            {
                $addFields: {
                    notes: {
                        $arrayElemAt: ["$detail", 0] // Use $arrayElemAt to get the first element if needed
                    }
                }
            }
        ]);

        if (getJob.length === 0) {
            return res.status(404).json({ error: "client not found" });
        }

        return res.status(200).json(getJob[0]);

    } catch (error) {
        console.log("Error in getOneJob controller", error.message);
        res.status(500).json({ error: "Internal server Error" })
    }
}

export const getAllClients = async(req, res) => {
    try {
        const getAllTheClients = await Job.find();

        if(getAllTheClients.length === 0){
            return res.status(201).json("Currently No Clients")
        }

        return res.status(200).json(getAllTheClients)
    } catch (error) {
        console.log("Error in getAllClients controller", error.message);
        res.status(500).json({ error: "Internal server Error" })
    }
}

//for Notes
export const saveNotes = async(req, res) => {
    try {
        const {clientId} = req.params;
        const {content} = req.body

        if(!clientId){
            return res.status(401).json({error: "ClientId is required"})
        }
        if(!content){
            return res.status(401).json({error: "Content is required to be save in database"})
        }

        let note = await Note.findOne({ userId: clientId });

        if (note) {
            note.content = content;
            await note.save();
        } else {
            note = await Note.create({
                userId: clientId,
                content
            });
        }

        console.log("success");
        return res.status(200).json(note)
    } catch (error) {
        console.log("Error in saveNotes controller", error.message);
        res.status(500).json({ error: "Internal server Error" })
    }
}