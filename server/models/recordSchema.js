import mongoose from 'mongoose';
import { analyzePerformance } from '../services/analyzerService.js';
import { triggerAlert } from '../services/alertService.js';

const { Schema } = mongoose;

const recordSchema = new Schema({
  student_id: {
    type: String,
    required: true,
    ref: 'User',
    index: true
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
    default: Date.now
  }
}, {
  timestamps: true
});

// --- PERFORMANCE TRACKING HOOK ---

recordSchema.post('save', async function (doc) {
  const analysis = analyzePerformance(doc);

  if (analysis.isAtRisk) {
    await triggerAlert(doc.student_id, analysis.analysisResult);
  }
});
const Record = mongoose.model('Record', recordSchema);

export default Record;
