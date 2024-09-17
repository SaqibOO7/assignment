import express from 'express'
import { createJob, updateJob, deleteJob, getOneJob, getAllClients, saveNotes } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router();

router.route('/save').post(
    upload.fields([
        {
            name: "inventoryImage",
            maxCount: 1
        }
    ]),
    createJob
)

router.route('/update/:clientId').patch(updateJob)
router.route('/delete/:clientId').delete(deleteJob)
router.route('/getjob/:clientId').get(getOneJob)
router.route('/').get(getAllClients)

router.route('/note/:clientId').post(saveNotes)

export default router