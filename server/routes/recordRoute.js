import express from 'express';
import {
  createRecord,
  getRecords,
  getStudentRecords,
  updateRecord,
  deleteRecord
} from '../controllers/recordController.js';

const router = express.Router();

/**
 * @route   /api/records
 * POST: Create a new record (IA, attendance, assignment)
 * GET:  Retrieve all records (Supports ?type= query param)
 */
router.route('/')
  .post(createRecord)
  .get(getRecords);

/**
 * @route   /api/records/student/:studentId
 * GET: Retrieve all activity history for a specific student (e.g., STU12345)
 */
router.get('/student/:studentId', getStudentRecords);

/**
 * @route   /api/records/:id
 * PUT:    Update a specific record's data (using MongoDB _id)
 * DELETE: Remove a record (using MongoDB _id)
 */
router.route('/:id')
  .put(updateRecord)
  .delete(deleteRecord);

export default router;
