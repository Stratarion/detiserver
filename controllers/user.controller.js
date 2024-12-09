import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../models/index.js";

const User = db.user;
const secret = 'test'; // TODO

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await User.findOne({ where: { email } });
    if (!oldUser) return res.status(404).json({ message: "Пользователь не создан" });
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Неверные логин или пароль" });
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
    res.status(201).json({ result: oldUser, token, status: 201 });
  } catch (err) {
    res.status(500).json({ message: "Что-то пошло не так" });
  };
};

export const signup = async (req, res) => {
  try {
    const { email, password, name, isOrganisation, address } = req.body;
    if (!email || !password || !name) {
      res.status(500).json("Не заполнены обязательные поля");
      return
    };
    const oldUser = await User.findOne({ where: { email } });
    if (oldUser) {
      res.status(400).json({ message: "Такой пользователь уже существует" });
      return
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({ email, password: hashedPassword, name, isOrganisation: isOrganisation ? 1 : 0, address });
    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
    console.log(error);
  };
};

export const getUserList = async (req, res) => {
  try {
    const { page } = req.query;
    const LIMIT = 5;
    const total = await User.count();
    User.findAll()
      .then(data => {
        const mappedUsers = data.map(({dataValues}) => {
          return {
            email: dataValues.email,
          }
        });
        res.json({ data: mappedUsers, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT), totalCount: total});
      }) 
  } catch (error) {
    res.status(500).send({
      message:
        err.message || "Произошла ошибка при получении списка пользователей"
    });
  };
};

export const destroyUsers = async (req, res) => {
  User.sync({ force: true }).then(() => {
    res.send("Таблица пользователей была (пере-)создана");
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Произошла ошибка при удалении таблицы"
    });
  });
};

export const authUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.user.email } });
    const token = jwt.sign({ email: user.email, id: user.id }, secret, { expiresIn: "1h" });
    res.status(201).json({ result: user, token, status: 201 });
  } catch (error) {
    res.send(error);
  };
};

export const userUpdate = async (req, res) => {
  try {
    const { address, email, name, phone } = req.body;
    const userId = req.query.id;

    const user = await User.findOne({ where: { id: userId }});
    user.name = name;
    user.address = address;
    user.email = email;
    user.phone = phone;
    await user.save();
    res.send("Пользователь обновлён");
  } catch (error) {
    res.send(error);
  }
};

