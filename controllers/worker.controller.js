import db from "../models/index.js";

const Worker = db.worker;

export const createWorker = async (req, res) => {
  const worker = req.body;
  if (!worker.name || !worker.org_id ||!worker.description) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const newWorker = {
    name: worker.name,
    org_id: worker.org_id,
    description: worker.description,
    createdAt: new Date().toISOString(),
  };
  Worker.create(newWorker).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      message:
        err.message || "Произошла ошибка при добавлении работника",
    });
  });
}

export const getWorkersByOrgId = async (req, res) => {
  const { org_id } = req.query;
  Worker.findAll({ where: { org_id } }).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      message:
        err.message || "Произошла ошибка при получении работников",
    });
  });
  return;
}
