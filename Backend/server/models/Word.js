// server/models/Word.js
import mongoose from "mongoose";

const exampleSentenceSchema = new mongoose.Schema({
  tamil: String,
  english: String,
  audioUrl: String
});

const wordSchema = new mongoose.Schema({
  tamil: { type: String, required: true },
  english: { type: String },
  imageUrl: String,   // e.g. "/public/images/amma.jpg"
  audioUrl: String,   // e.g. "/public/audio/amma.mp3"
  relatedWords: [String],
  exampleSentences: [exampleSentenceSchema]
}, { timestamps: true });

export default mongoose.model("Word", wordSchema);
