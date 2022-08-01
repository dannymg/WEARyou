import { Clothe } from "../models/clotheModel.js";

export const getClothes = async (req, res) => {
  try {
    const clothes = await Clothe.findAll();
    res.json(clothes);
  } catch (error) {
    return res.status(500).json({ message: error.mesage });
  }
};

export const getClothe = async (req, res) => {
  try {
    const { code } = req.params;
    const clothe = await Clothe.findOne({
      where: {
        code,
      },
    });

    if (!clothe) {
      return res.status(404).json({ message: "The clothe doesn't exist" });
    }
    res.json(clothe);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createClothe = async (req, res) => {
  const { code, brand, color, size, price, iva, clothe_type, target_public } =
    req.body;
  try {
    const newClothe = await Clothe.create({
      code,
      brand,
      color,
      size,
      price,
      iva,
      clothe_type,
      target_public,
    });
    res.json(newClothe);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateClothe = async (req, res) => {
  try {
    const { code } = req.params;
    const { brand, color, size, price, iva, clothe_type, target_public } =
      req.body;

    const clothe = await Clothe.findByPk(code);
    clothe.brand = brand;
    clothe.color = color;
    clothe.size = size;
    clothe.price = price;
    clothe.iva = iva;
    clothe.clothe_type = clothe_type;
    clothe.target_public = target_public;

    await clothe.save();
    res.json(clothe);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteClothe = async (req, res) => {
  try {
    const { code } = req.params;

    await Clothe.destroy({
      where: {
        code,
      },
    });

    res.sendStatus("204");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
