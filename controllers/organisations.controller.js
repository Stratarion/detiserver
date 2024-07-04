import db from "../models/index.js";

const Organisation = db.organisation;


export const getOrganisations = async (req, res) => {
  const { page } = req.query;
  const LIMIT = 2;
  const total = await Organisation.count();
  Organisation.findAll()
  .then(data => {
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
}
