import Record from '../models/recordSchema.js';

// @desc    Create a new record (IA, attendance, etc.)
// @route   POST /api/records
export const createRecord = async (req, res) => {
  try {
    const newRecord = new Record(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all records (Filterable by type via query: ?type=IA)
// @route   GET /api/records
export const getRecords = async (req, res) => {
  try {
    const { type } = req.query;
    const filter = type ? { type } : {};

    const records = await Record.find(filter).sort({ timestamp: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all records for a specific student
// @route   GET /api/records/student/:studentId
export const getStudentRecords = async (req, res) => {
  try {
    const records = await Record.find({ student_id: req.params.studentId })
      .sort({ timestamp: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a record
// @route   PUT /api/records/:id
export const updateRecord = async (req, res) => {
  try {
    const updatedRecord = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedRecord) return res.status(404).json({ message: 'Record not found' });
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a record
// @route   DELETE /api/records/:id
export const deleteRecord = async (req, res) => {
  try {
    const deletedRecord = await Record.findByIdAndDelete(req.params.id);
    if (!deletedRecord) return res.status(404).json({ message: 'Record not found' });
    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
