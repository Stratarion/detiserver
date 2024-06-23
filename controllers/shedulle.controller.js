import db from "../models/index.js";

const Shedulle = db.shedulle;

export const createEvent = async (req, res) => {
  const shedulle = req.body;
  if (!shedulle.org_id || !shedulle.lesson) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const newShedulle = {
    time_start: shedulle.time_start,
    time_end: shedulle.time_end,
    date_start: shedulle.date_start,
    date_end: shedulle.date_end,
    worker: shedulle.worker,
    lesson: shedulle.lesson,    
    org_id: shedulle.org_id,
    group_size: shedulle.group_size,
  };
  Shedulle.create(newShedulle).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      message:
        err.message || "Произошла ошибка при добавлении события",
    });
  });
}

export const getShedullesByOrgId = async (req, res) => {
  const { org_id } = req.query;
  Shedulle.findAll({ where: { org_id } }).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      message:
        err.message || "Произошла ошибка при получении работников",
    });
  });
  return;
}
