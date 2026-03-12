import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    enum: ["student", "faculty"],
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  academic_info: {
    department: { type: String, required: true },
    year: { type: String },
    semester: { type: Number },
    class: { type: String }
  },
  roll_no: {
    type: Number,
    required: function () {
      return this.role === "student";
    }
  }
}, {
  timestamps: true
})

const User = mongoose.model("User", userSchema)

export default User
