import { Notification } from "../models/notificationModel.js";

export const getUserNotifications = async (req, res) => {
  try {
    const { username } = req.params;
    const notifications = await Notification.findAll({
      where: {
        username,
      },
    });
    res.json(notifications);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserNotification = async (req, res) => {
  try {
    const { username, code } = req.params;
    const notification = await Notification.findAll({
      where: {
        code,
        username,
      },
    });

    if (!notification) {
      return res
        .status(404)
        .json({ message: "The notification doesn't exist" });
    }
    res.json(notification);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll();
    res.json(notifications);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const createNotification = async (req, res) => {
  const { code, date_notification, state, username } = req.body;
  try {
    const newNotification = await Notification.create({
      code,
      date_notification,
      state,
      username,
    });
    res.json(newNotification);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateStateNotification = async (req, res) => {
  try {
    const { code } = req.params;
    const { state } = req.body;

    const notification = await Notification.findByPk(code);
    notification.state = state;

    await notification.save();
    res.json(notification);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { code } = req.params;

    await Notification.destroy({
      where: {
        code,
      },
    });

    res.sendStatus("204");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
