import mongoose from 'mongoose';

const { Schema } = mongoose;

const notificationSchema = new Schema({
  recipient: {
    type: String, // Refers to user_id from your UserSchema
    required: true,
    ref: 'User',
    index: true
  },
  type: {
    type: String,
    required: true,
    enum: ['academic_alert', 'attendance_alert', 'submission_alert', 'general'],
    default: 'general'
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  is_read: {
    type: Boolean,
    default: false
  },
  expires_at: {
    type: Date,
    default: () => new Date(+new Date() + 30 * 24 * 60 * 60 * 1000) // Auto-expire after 30 days
  }
}, {
  timestamps: true
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
