import db from "../models/index.js";
import { Sequelize } from "sequelize";

const Organisation = db.organisation;

export const getGartens = async(req, res) => {
  const { page } = req.query;
  const LIMIT = 5;
  const { filters } = req.body;
  console.log(filters?.address);
  Organisation.findAll({ where:
    {
      [Sequelize.Op.and]: {
        type: "сад",
        name: { [Sequelize.Op.like]: `%${filters?.name || ""}%` },
        address: { [Sequelize.Op.like]: `%${filters?.address || ""}%` },
        // phone: { [Sequelize.Op.like]: `%${filters?.phone || ""}%` },
        schoolType: { [Sequelize.Op.like]: `%${filters?.schoolType || ""}%` },
      }
    }
  }).then((data) => {
    const mappedOrganisation = data.map(item => item.dataValues);
    const total = mappedOrganisation.length;
    res.json({ data: mappedOrganisation, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT), totalCount: total});

  })
    .catch(err => {
    res.status(500).send({
      message:
        err.message || "Ошибка при получении списка Детских садов"
    });
  });
};