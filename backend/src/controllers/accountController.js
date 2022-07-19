import { Account } from "../models/accountModel.js";

export const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll();
    res.json(accounts);
  } catch (error) {
    return res.status(500).json({ message: error.mesage });
  }
};

export const getAccount = async (req, res) => {
  try {
    const { email } = req.params;
    const account = await Account.findOne({
      where: {
        email,
      },
    });

    if (!account) {
      return res.status(404).json({ message: "The account doesn't exist" });
    }
    res.json(account);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createAccount = async (req, res) => {
  const { email, password } = req.body;
  try {
    const newAccount = await Account.create({
      email,
      password,
    });
    res.json(newAccount);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateAccount = async (req, res) => {
  try {
    const { email } = req.params;
    const { password } = req.body;

    const account = await Account.findByPk(email);
    account.password = password;
    await account.save();
    res.json(account);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const { email } = req.params;

    await Account.destroy({
      where: {
        email,
      },
    });

    res.sendStatus("204");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
