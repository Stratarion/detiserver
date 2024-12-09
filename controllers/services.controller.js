import db from "../models/index.js";
import { Sequelize, where } from "sequelize";

const Services = db.services;

export const getServicesByUserIdAndType = async (req, res) => {
	try {
		if (!req.query.id ||!req.query.type) {
      return res.status(400).json({ message: "Missing user id or type" });
    }
		const id = req.query.id;
		const list = await Services.findAll({ where: {
			[Sequelize.Op.and]: [
        { userId: id },
        { type: req.query.type },
      ],
		}})
		res.status(200).json({ data: list, totalCount: list.length });
	} catch (err) {
		res.status(500).json({ message: err.message });
  }
}

export const createService = async (req, res) => {
	try {
		const newService = await Services.create(req.body);
    res.status(201).json({ data: newService });
  } catch (err) {
		res.status(400).json({ message: err.message });
	}
}

export const updateService = async (req, res) => {
	try {
    const updatedService = await Services.update(req.body, { where: { id: req.params.id } });
    if (!updatedService[0]) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ data: updatedService });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

}

export const deleteService = async (req, res) => {
	try {
    const deletedService = await Services.destroy({ where: { id: req.params.id } });
    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const getServiceById = async (req, res) => {
	try {
    const service = await Services.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ data: service });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const getServicesByType = async (req, res) => {
	try {
    const services = await Services.findAll({ where: { type: req.params.type } });
    res.status(200).json({ data: services, totalCount: services.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


export const getSportServices = async (req, res) => {
	try {
		const { page, limit, filters } = req.body;

    const services = await Services.findAll({ where: { type: "sport" } });
    res.status(200).json({ data: services, totalCount: services.length, cerrentPage: page });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const getDevelopmenttServices = async (req, res) => {
	try {
		const { page, limit, filters } = req.body;

    const services = await Services.findAll({ where: { type: "development" } });
    res.status(200).json({ data: services, totalCount: services.length, cerrentPage: page });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

