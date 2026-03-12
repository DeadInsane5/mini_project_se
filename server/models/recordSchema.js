import mongoose from 'mongoose';

const { Schema } = mongoose;

const recordSchema = new Schema({
  student_id: {
    type: String,
    required: true,
    ref: 'User', // References the 'User' model
    index: true   // Added for faster querying by student
  },
  type: {
    type: String,
    required: true,
    enum: ['IA', 'attendance', 'assignment'],
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  data: {
    marks: {
      type: Number,
      default: null
    },
    percentage: {
      type: Number,
      default: null
    },
    late_by: {
      type: String,
      default: null
    }
  },
  timestamp: {
    type: Date,
    default: Date.now // Defaults to the current time if not provided
  }
}, {
  timestamps: true // Tracks when the record itself was created/updated
});

const Record = mongoose.model('Record', recordSchema);

export default Record;
