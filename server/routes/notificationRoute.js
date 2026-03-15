import express from "express"
import { createNotification, getStudentNotifications } from "../controllers/notificationController.js"

const router = express.Router()

router.route("/").post(createNotification)

router.get("/student/:recipient", getStudentNotifications)

export default router
