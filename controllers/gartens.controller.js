import express from 'express';
import db from "../models/index.js";

const Garten = db.garten;
const Op = db.Sequelize.Op;

const router = express.Router();

export const getGartens = async (req, res) => {
  const { page } = req.query;
  const LIMIT = 5;
  const total = await Garten.count();
  Garten.findAll()
  .then(data => {
    const mappedGarten = data.map(item => item.dataValues);
    res.json({ data: mappedGarten, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT), totalCount: total});

  })
    .catch(err => {
    res.status(500).send({
      message:
        err.message || "Ошибка при получении списка Детских садов"
    });
  });
};

export const createGarten = async (req, res) => {
  const item = req.body;

  if (!item.name) {
    res.status(400).send({
      message: "Не заполнены обязательные поля"
    });
    return;
  }
  console.log("!!!!!!!!!!!!!!!!!!!", item)

  const newGarten = {
    createdAt: new Date().toISOString(),
    geo1: +item.geo[0].trim(),
    geo2: +item.geo[1].trim(),
    name: item.name,
    maxCount: item.maxCount,
    description: item.description,
    type: item.type,
    rate: item.rate,
    costInfo: item.costInfo,
    owner: item.owner,
  }

  console.log("!!!!!!!!!!!!!!!!!!!", newGarten)

  Garten.create(newGarten)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Произошла ошибка при добавлении Детского сада"
    });
  })
}

export const destroyGartens = async(req, res) => {
  Garten.sync({ force: true }).then(() => {
    res.send("Таблица сады была (пере-)создана");
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Произошла ошибка при удалении таблицы"
    });
  })
}

export default router;