// server/models/Grade.js
import mongoose from "mongoose";

const weekSchema = new mongoose.Schema({
  week: Number,
  words: [{ type: mongoose.Schema.Types.ObjectId, ref: "Word" }]
});

const gradeSchema = new mongoose.Schema({
  grade: { type: String, required: true }, // "KG", "1", "2", ...
  weeks: [weekSchema]
});

export default mongoose.model("Grade", gradeSchema);
