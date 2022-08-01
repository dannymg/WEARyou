import { Payment } from "../models/paymentModel.js";

export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.json(payments);
  } catch (error) {
    return res.status(500).json({ message: error.mesage });
  }
};

export const getPayment = async (req, res) => {
  try {
    const { code } = req.params;
    const payment = await Payment.findAll({
      where: {
        code,
      },
    });

    if (!payment) {
      return res.status(404).json({ message: "The payment doesn't exist" });
    }
    res.json(payment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPayment = async (req, res) => {
  const { code, card, payment_date, amount, description, completed } = req.body;
  try {
    const newPayment = await Payment.create({
      code,
      card,
      payment_date,
      amount,
      description,
      completed,
    });
    res.json(newPayment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCompletedPayment = async (req, res) => {
  try {
    const { code } = req.params;
    const { completed } = req.body;

    const payment = await Payment.findByPk(code);
    payment.completed = completed;

    await payment.save();
    res.json(payment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePayment = async (req, res) => {
  try {
    const { code } = req.params;

    await Payment.destroy({
      where: {
        code,
      },
    });

    res.sendStatus("204");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
