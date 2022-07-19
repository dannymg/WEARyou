import { User } from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.mesage });
  }
};

export const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await Alumno.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "El usuario no existe" });
    }
    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { username, name, lastname, birth_date, phone, user_type, email } =
    req.body;

  try {
    const newUser = await User.create({
      username,
      name,
      lastname,
      birth_date,
      phone,
      user_type,
      email,
    });
    res.json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username } = req.params;
    const { name, lastname, birth_date, phone, user_type, email } = req.body;

    const user = await User.findByPk(username);
    console.log(alumno);
    user.name = name;
    user.lastname = lastname;
    user.birth_date = birth_date;
    user.phone = phone;
    user.user_type = user_type;
    user.email = email;

    await user.save();
    res.json(user);
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
