// server/seed.js
import fs from "fs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Word from "./models/Word.js";
import Grade from "./models/Grade.js";

dotenv.config();

const wordsData = JSON.parse(fs.readFileSync("./data/words.json", "utf-8"));
const gradesData = JSON.parse(fs.readFileSync("./data/grades.json", "utf-8"));

const importData = async () => {
  try {
    await connectDB();

    // Clear existing collections
    await Word.deleteMany();
    await Grade.deleteMany();

    // Insert words
    const createdWords = await Word.insertMany(wordsData);
    console.log("Words inserted!");

    // Link first week's words
    gradesData[0].weeks[0].words = createdWords.map(w => w._id);

    // Insert grades
    await Grade.insertMany(gradesData);
    console.log("Grades inserted!");

    process.exit();
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await Word.deleteMany();
    await Grade.deleteMany();
    console.log("Data destroyed!");
    process.exit();
  } catch (err) {
    console.error("Error destroying data:", err);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
