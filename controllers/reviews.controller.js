import db from "../models/index.js";
import { Sequelize } from "sequelize";

const Reviews = db.review;


export const getReviewsById = async (req, res) => {
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
}

export const createNewReview = async (req, res) => {
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
}
export const checkUserReview = async (req, res) => {
  const { userId, schoolId } = req.query;
  const userReview = await Reviews.findOne({ where: { createrId: userId, orgId: schoolId } });
  res.json(userReview || false);
}
