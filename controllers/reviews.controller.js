import db from "../models/index.js";
import { Sequelize } from "sequelize";

const Reviews = db.review;


export const getReviewsById = async (req, res) => {
  try {
    const id = req.query.id;
    const reviewList = await Reviews.findAll({ where: { orgId: id } });
    let totalRating = 0;
    reviewList.map((review) => totalRating += review.rating)
    const averageRating = (totalRating / reviewList.length).toFixed(2); 
    res.json({
      data: reviewList,
      totalCount: reviewList.length,
      averageRating
    });
  } catch (error) {
    res.status(500).send({
      message:
        err.message || "Произошла ошибка при получении отзывов"
    });
  }

}

export const createNewReview = async (req, res) => {
  try {
    const { content, rating, schoolId, createrId, createrName, createrAvatar } = req.body;
    const newReview = await Reviews.create({
      content,
      createrId,
      createrName,
      orgId: schoolId,
      rating,
      createrAvatar
    });
    res.json(newReview);
  } catch (error) {
    res.status(500).send({
      message:
        err.message || "Произошла ошибка при создании ревью"
    });
  }

}
export const checkUserReview = async (req, res) => {
  try {
    const { userId, schoolId } = req.query;
    const userReview = await Reviews.findOne({ where: { createrId: userId, orgId: schoolId } });
    res.json(userReview || false);
  } catch (error) {
    res.status(500).send({
      message:
        err.message || "Произошла ошибка при получении отзывов"
    });
  }
}

export const updateReview = async (req, res) => {
  try {
    const { content, rating, id } = req.body;
    const updatedReview = await Reviews.update({ content, rating }, { where: { id } });
    res.json(updatedReview);
  } catch (error) {
    res.status(500).send({
      message:
        err.message || "Произошла ошибка при изменении отзыва"
    });
  }
}

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await Reviews.destroy({ where: { id } });
    res.json(deletedReview);
  } catch (error) {
    res.status(500).send({
      message:
        err.message || "Произошла ошибка при удалении отзыва"
    });
  }
}
