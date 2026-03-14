import Notification from '../models/notificationSchema.js';

export const triggerAlert = async (studentId, analysisResult) => {
  const { type, title, message, priority, is_read, expires_at } = analysisResult;

  try {
    // 1. Log the alert for debugging
    console.log(`[ALERT SERVICE] Notifying User ${studentId}: ${message}`);

    // 2. Logic to save to a Notification Collection (Example)

    await Notification.create({
      recipient: studentId,
      type: type,
      title: title,
      message: message,
      priority: priority,
      is_read: is_read,
      expires_at: expires_at,
      timestamp: new Date()
    });


    // 3. Optional: Add Email or WebSocket trigger here
    // sendEmail(studentId, message);

  } catch (error) {
    console.error("Failed to trigger alert:", error);
  }
};
