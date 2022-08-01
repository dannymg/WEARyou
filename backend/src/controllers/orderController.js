import { Order } from "../models/orderModel.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.mesage });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { code } = req.params;
    const order = await Order.findAll({
      where: {
        code,
      },
    });

    if (!order) {
      return res.status(404).json({ message: "The order doesn't exist" });
    }
    res.json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createOrder = async (req, res) => {
  const { code, amount, date_top, payment_code, detail_code } = req.body;
  try {
    const newOrder = await Order.create({
      code,
      amount,
      date_top,
      payment_code,
      detail_code,
    });
    res.json(newOrder);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/*
export const updateOrder = async (req, res) => {
  try {
    const { code } = req.params;
    const { amount, date_top, payment_code, detail_code } = req.body;

    const order = await Order.findByPk(code);
    order.amount = amount;
    order.date_top = date_top;
    order.payment_code = payment_code;
    order.detail_code = detail_code;

    await order.save();
    res.json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
*/

export const deleteOrder = async (req, res) => {
  try {
    const { code } = req.params;

    await Order.destroy({
      where: {
        code,
      },
    });

    res.sendStatus("204");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
