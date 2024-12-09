import db from "../models/index.js";
import { Sequelize } from "sequelize";

const Organisation = db.organisation;
const Reviews = db.review;


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

export const getSchoolList = async (req, res) => {
  try {
    const { filters, page, limit } = req.body;
    console.log(filters);
    console.log("Loading");
    const organisations = await Organisation.findAll({
      where: {
        [Sequelize.Op.and]: [
          { type: "school" },
          { name: { [Sequelize.Op.substring]: filters?.name || "" } },
          { schoolType: { [Sequelize.Op.substring]: filters?.type || "" } },
          { address: { [Sequelize.Op.substring]: filters?.city || "" } },
          { costInfo: { [Sequelize.Op.between]: filters?.minPrice ? [filters?.minPrice, filters?.maxPrice] : [0, 1000000] } },
        ]
      }
    })
    console.log(organisations)
    const mappedOrganisation = organisations.map(item => item.dataValues);

    const result = await Promise.all(mappedOrganisation.map(async (organisation) => {
      const reviews = await Reviews.findAll({
        where: { orgId: organisation.id },
      });

      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const reviewCount = reviews.length;
      return {
          ...organisation,
          totalRating,
          reviewCount,
      };
    }))
    const total = result.length - 1;
    res.json({ data: result, currentPage: Number(page), numberOfPages: Math.ceil(total / limit), totalCount: total});
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Ошибка при получении списка Школ"
    });
  }
}


export const getGardenList = async (req, res) => {
  try {
    const { filters, page, limit } = req.body;
    console.log(filters);
    console.log("Loading");
    const organisations = await Organisation.findAll({
      where: {
        [Sequelize.Op.and]: [
          { type: "garden" },
          // { name: { [Sequelize.Op.substring]: filters?.name || "" } },
          // { schoolType: { [Sequelize.Op.substring]: filters?.type || "" } },
          // { address: { [Sequelize.Op.substring]: filters?.city || "" } },
          // { costInfo: { [Sequelize.Op.between]: filters?.minPrice ? [filters?.minPrice, filters?.maxPrice] : [0, 1000000] } },
        ]
      }
    })
    console.log(organisations)
    const mappedOrganisation = organisations.map(item => item.dataValues);

    const result = await Promise.all(mappedOrganisation.map(async (organisation) => {
      const reviews = await Reviews.findAll({
        where: { orgId: organisation.id },
      });

      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const reviewCount = reviews.length;
      return {
          ...organisation,
          totalRating,
          reviewCount,
      };
    }))
    const total = result.length - 1;
    res.json({ data: result, currentPage: Number(page), numberOfPages: Math.ceil(total / limit), totalCount: total});
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Ошибка при получении списка Садов"
    });
  }
}

export const getOrganisationById = async (req, res) => {
  const id = req.query.id;
  const organisation = await Organisation.findOne({ where: { id } });
  const reviews = await Reviews.findAll({ where: { orgId: id } });
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  console.log(reviews)
  res.json({...organisation.dataValues, reviewCount: reviews.length, totalRating });
}

export const getOrganisationByUserId = async (req, res) => {
  const userId = req.query.id;
  const organisations = await Organisation.findAll({ where: { creater_id: userId } });
  res.json(organisations);
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
