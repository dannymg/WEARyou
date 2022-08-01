import app from "./app.js";
import { sequelize } from "./database/database.js";
const port = 4000;
const hostname = "localhost";

// Importing models to add in the DB
import "./models/accountModel.js";
import "./models/orderModel.js";
import "./models/clotheModel.js";
import "./models/detailModel.js";
import "./models/userModel.js";
import "./models/notificationModel.js";

async function main() {
  try {
    // await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log("DB connection correct");
    app.listen(port, hostname);
    console.log("Server listeling at port ", port);
  } catch (error) {
    console.log("Failed to connect DB ", error);
  }
}

main();
