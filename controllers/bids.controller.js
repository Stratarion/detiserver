import db from "../models/index.js";
import { Sequelize } from "sequelize";

const Bids = db.bids;

export const createBids = async (req, res) => {
	try {
		const bid = await Bids.create(req.body);
		res.status(201).json(bid);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

export const getBidsByServiceId = async (req, res) => {
	try {
    const bids = await Bids.findAll({ where: { eventId: req.params.id } });
    res.json(bids);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getBidsByUserId = async (req, res) => {
	try {
    const bids = await Bids.findAll({ where: { studentId: req.params.id } });
    res.json(bids);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const updateBid = async (req, res) => {
	try {
    const bid = await Bids.findByPk(req.params.id);
    if (!bid) return res.status(404).json({ message: "Bid not found" });

    const updatedBid = await bid.update(req.body);
    res.json(updatedBid);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const deleteBid = async (req, res) => {
	try {
    const bid = await Bids.findByPk(req.params.id);
    if (!bid) return res.status(404).json({ message: "Bid not found" });

    await bid.destroy();
    res.json({ message: "Bid deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
