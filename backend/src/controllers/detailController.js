import { Detail } from "../models/detailModel.js";

export const getDetails = async (req, res) => {
  try {
    const details = await Detail.findAll();
    res.json(details);
  } catch (error) {
    return res.status(500).json({ message: error.mesage });
  }
};

export const getDetail = async (req, res) => {
  try {
    const { code } = req.params;
    const detail = await Detail.findAll({
      where: {
        code,
      },
    });

    if (!detail) {
      return res.status(404).json({ message: "The detail doesn't exist" });
    }
    res.json(detail);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createDetail = async (req, res) => {
  const { code, clothes, quantity } = req.body;
  try {
    const newDetail = await Detail.create({
      code,
      clothes,
      quantity,
    });
    res.json(newDetail);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateDetail = async (req, res) => {
  try {
    const { code } = req.params;
    const { clothes, quantity } = req.body;

    const detail = await Detail.findByPk(code);
    detail.clothes = clothes;
    detail.quantity = quantity;

    await detail.save();
    res.json(detail);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteDetail = async (req, res) => {
  try {
    const { code } = req.params;

    await Detail.destroy({
      where: {
        code,
      },
    });

    res.sendStatus("204");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
