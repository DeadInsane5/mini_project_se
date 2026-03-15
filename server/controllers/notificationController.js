import Notification from "../models/notificationSchema.js";

// @desc Create a new notification (IA, attendance, etc.)
// @route POST /api/notification

export const createNotification = async (req, res) => {
  try {
    const newNotif = new Notification(req.body)
    const savedNotif = await newNotif.save()
    res.status(201).json(savedNotif)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Get all notifications for a specific student
// @route   GET /api/notification/student/:recipient
export const getStudentNotifications = async (req, res) => {
  try {
    const notifs = await Notification.find({ recipient: req.params.recipient }).sort({ timestamp: -1 })
    res.status(200).json(notifs)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
