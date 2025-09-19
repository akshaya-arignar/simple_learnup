import Word from "../models/Word.js";

// @desc Get all words
// @route GET /api/words
export const getWords = async (req, res) => {
  try {
    const words = await Word.find({});
    res.json(words);
  } catch (error) {
    res.status(500).json({ message: "Error fetching words" });
  }
};
