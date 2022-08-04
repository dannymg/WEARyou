import { User } from "../models/userModel.js";
import { constants } from "../config/constants.js";
import {
  generateARandomSalt,
  hashPassword,
  isCorrectPassword,
  cleanUser,
  createNewJwt,
} from "../utils/authUtils.js";
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json((users || []).map(cleanUser));
  } catch (error) {
    return res.status(500).json({ message: error.mesage });
  }
};

export const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "The user doesn't exist" });
    }
    res.json(cleanUser(user));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const {
    username,
    name,
    last_name,
    birth_date,
    phone,
    direction,
    email,
    password,
  } = req.body;

  try {
    const randomSalt = generateARandomSalt();
    const newUser = await User.create({
      username,
      name,
      last_name,
      birth_date: new Date(birth_date),
      phone,
      direction,
      email,
      salt: randomSalt,
      password: hashPassword(password, randomSalt),
      role: constants.ROLES.CLIENT,
    });

    const token = createNewJwt(newUser);
    res.json({
      token,
      user: cleanUser(newUser),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username } = req.params;
    const {
      name,
      last_name,
      birth_date,
      phone,
      direction,
      user_type,
      email,
      password,
    } = req.body;

    const user = await User.findByPk(username);
    const randomSalt = generateARandomSalt();

    user.name = name;
    user.last_name = last_name;
    user.birth_date = birth_date;
    user.phone = phone;
    user.direction = direction;
    user.user_type = user_type;
    user.email = email;
    user.salt = randomSalt;
    user.password = hashPassword(password, randomSalt);
    user.role = constants.ROLES.CLIENT;

    await user.save();
    res.json(cleanUser(user));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { username } = req.params;

    await User.destroy({
      where: {
        username,
      },
    });

    res.sendStatus("204");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const signInUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "The user doesn't exist" });
    }
    if (!isCorrectPassword(password, user)) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = createNewJwt(user);
    res.json({
      token,
      user: cleanUser(user),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
