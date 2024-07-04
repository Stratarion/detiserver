import db from "../models/index.js";

const Organisation = db.organisation;

export const getGartens = async(req, res) => {
  const { page } = req.query;
  const LIMIT = 5;
  Organisation.findAll({ where: { type: "сад "}}).then((data) => {
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