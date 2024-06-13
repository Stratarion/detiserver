import db from "../models/index.js";

const Lesson = db.lesson;

export const createLesson = async (req, res) => {
  const lesson = req.body;
  if (!lesson.name || !lesson.org_id ||!lesson.description) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const newLesson = {
    name: lesson.name,
    org_id: lesson.org_id,
    description: lesson.description,
    createdAt: new Date().toISOString(),
  };
  Lesson.create(newLesson).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      message:
        err.message || "Произошла ошибка при добавлении работника",
    });
  });
}

export const getLessonsByOrgId = async (req, res) => {
  const { org_id } = req.query;
  Lesson.findAll({ where: { org_id } }).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      message:
        err.message || "Произошла ошибка при получении работников",
    });
  });
  return;
}
