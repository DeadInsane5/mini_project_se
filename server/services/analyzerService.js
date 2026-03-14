import { PERFORMANCE_THRESHOLDS } from '../utils/constants.js';

/**
 * Analyzes record data to determine if performance is dropping.
 * @returns {Object} { isAtRisk: boolean, message: string }
 */
export const analyzePerformance = (record) => {
  const { type, subject, data } = record;
  let isAtRisk = false;
  let analysisResult = {
    type: "",
    title: "",
    message: "",
    priority: ""
  }

  switch (type) {
    case 'IA':
      if (data.marks < PERFORMANCE_THRESHOLDS.MIN_IA_MARKS) {
        isAtRisk = true;
        analysisResult = {
          type: "academic_alert",
          title: "Poor IA exam performance",
          message: `Critical: Your score in ${subject} IA (${data.marks}) is below the threshold.`,
          priority: "medium"
        }
      }
      break;

    case 'attendance':
      if (data.percentage < PERFORMANCE_THRESHOLDS.MIN_ATTENDANCE_PERCENTAGE) {
        isAtRisk = true;
        analysisResult = {
          type: "attendance_alert",
          title: "Low attendance",
          message: `Warning: Attendance in ${subject} has dropped to ${data.percentage}%.`,
          priority: "medium"
        }
      }
      break;

    case 'assignment':
      const isLate = data.late_by !== null;
      const isPoorMark = data.marks < PERFORMANCE_THRESHOLDS.MIN_ASSIGNMENT_MARKS;

      if (isLate || isPoorMark) {
        isAtRisk = true;
        analysisResult = {
          type: "submission_alert",
          title: "Poor performance in assignments",
          message: `Assignment Alert (${subject}): ${isLate ? 'Late submission' : ''} ${isPoorMark ? 'Low grade' : ''}`,
          priority: "medium"
        }
      }
      break;
  }

  return { isAtRisk, analysisResult };
};
