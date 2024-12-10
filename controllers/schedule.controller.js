import db from "../models/index.js";
import { Sequelize } from "sequelize";

const Schedule = db.schedule;
const Service = db.services;
const User = db.user;
const Bids = db.bids;

export const getScheduleEvents = async (req, res) => {
  try {
    const events = await Schedule.findAll({ where: {
			[Sequelize.Op.and]: [
        { ownerId: req.query.userId },
        { date: { [Sequelize.Op.gte]: req.query.startDate || "" } },
        { date: { [Sequelize.Op.lte]: req.query.endDate || "" } },
      ]
    } });
    console.log(req.query.startDate);
    const mappedEvents = events.map(event => event.dataValues);

    const eventsWithService = await Promise.all(mappedEvents.map(async (event) => {
      const service = await Service.findByPk(event.serviceId);
      return {...event, service: service.dataValues };
    }));

    const withTeacherInfo = await Promise.all(eventsWithService.map(async (event) => {
      const teacher = await User.findByPk(event.teacherId);
      return {...event, teacher: teacher.dataValues };
    }));

    const withBids = await Promise.all(withTeacherInfo.map(async (event) => {
      const bids = await Bids.findAll({ where: { eventId: event.id } });
      return {...event, participants: bids.map(bid => bid.dataValues) };
    }));

    res.status(200).json({
      data: withBids,
      totalCount: events.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createScheduleEvent = async (req, res) => {
  try {
    const event = await Schedule.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteScheduleEvent = async (req, res) => {
  try {
    const event = await Schedule.findByPk(req.query.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    await event.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updateScheduleEvent = async (req, res) => {
  try {
    const event = await Schedule.findByPk(req.body.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    await event.update(req.body);
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
