import db from "../models/index.js";

const Lesson = db.lesson;
const Worker = db.worker;

export const getInfoSheduller = async (req, res) => {
  const { org_id } = req.query;
  try {
    const lessons = await Lesson.findAll({
      where: {
        org_id,
      },
    });
    const workers = await Worker.findAll({
      where: {
        org_id,
      },
    });
    res.status(200).json({ lessons, workers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};