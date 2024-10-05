import db from "../models/index.js";
import { Sequelize } from "sequelize";

const Organisation = db.organisation;


export const getOrganisations = async (req, res) => {
  const { page } = req.query;
  const { filters } = req.body;
  const LIMIT = 2;
  console.log("Loading");
  Organisation.findAll({
    where: {
      // [Op.and]: filters.map(filter => ({
      //   [filter.field]: {
      //     [Op.like]: `%${filter.value}%`
      //   }
      // })) хороший вариант фильтрации универсальной, если есть много полей подходящих под одну фильтрацию
      [Sequelize.Op.and]: [
        // { name: filters.name },
        { name: { [Sequelize.Op.like]: "2"} },
        // { schoolType: filters.schoolType }
      ]
    }
  })
  .then(data => {
    const total = data.length - 1;
    const mappedOrganisation = data.map(item => item.dataValues);
    res.json({ data: mappedOrganisation, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT), totalCount: total});

  })
    .catch(err => {
    res.status(500).send({
      message:
        err.message || "Ошибка при получении списка Детских садов"
    });
  });
};

export const getOrganisationById = async (req, res) => {
  const id = req.query.id;
  const organisation = await Organisation.findOne({ where: { id } });
  res.json(organisation);
}

export const createOrganisation = async (req, res) => {
  const item = req.body;

  if (!item.name) {
    res.status(400).send({
      message: "Не заполнены обязательные поля"
    });
    return;
  }

  const newOrganisation = {
    createdAt: new Date().toISOString(),
    name: item.name,
    description: item.description,
    address: item.address,
    type: item.type,
    email: item.email,
    schoolType: item.schoolType,
    owner: item.owner || "",
    creater_id: item.creater_id
  }

  Organisation.create(newOrganisation)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Произошла ошибка при добавлении Секции"
    });
  })
}

export const destroyOrganisations = async(req, res) => {
  Organisation.sync({ force: true }).then(() => {
    res.send("Таблица секции была (пере-)создана");
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Произошла ошибка при удалении таблицы"
    });
  })
};

export const organisationUpdate = async (req, res) => {
  try {
    const { avatar_url, id } = req.body;
    console.log(avatar_url)
    if (!avatar_url) {
      res.status(500).json("Не заполнены обязательные поля");
      return;
    };
    const org = await Organisation.findOne({ where: { id }});
    org.avatar_url = avatar_url;
    await org.save();
    res.send("Пользователь обновлён");
  } catch (error) {
    res.send(error);
  }
};
