import Grade from "../models/Grade.js";

// @desc Get all grades
// @route GET /api/grades
export const getGrades = async (req, res) => {
  try {
    const grades = await Grade.find({});
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: "Error fetching grades" });
  }
};
