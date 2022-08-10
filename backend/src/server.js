import app from "./app.js";
import { sequelize } from "./database/database.js";
import { createAdminUserIfNotExists } from "./utils/authUtils.js";
const port = process.env.PORT || 4000;

// Importing models to add in the DB
import "./models/orderModel.js";
import "./models/clotheModel.js";
import "./models/detailModel.js";
import "./models/userModel.js";
import "./models/notificationModel.js";

async function main() {
  try {
    // await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log("DB connection correct");
    app.listen(port, () => {
      console.log(`Express server listening on port ${port}`);
    });
  } catch (error) {
    console.log("Failed to connect DB ", error);
  }

  try {
    await createAdminUserIfNotExists()
  } catch (error) {
    console.log("Usuario administrador no pudo ser creado", error);
  }
}

main();
