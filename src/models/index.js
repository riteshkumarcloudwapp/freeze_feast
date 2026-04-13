import { Sequelize } from "sequelize";
// The project doesn't have a `db.js` file under `common/config`.
// The connection information is provided by envConfig and the
// helper in `src/config/database.js`, so let's reuse that instead.
import { sequelize } from "../config/database.js";

import User from "./User.js";
import Contact from "./Contact.js"

// No need to recreate the Sequelize instance here; use the one
// already configured above.
// const sequelize = new Sequelize(dbConfig.url, {
//   ...dbConfig,
//});

const models = {
  User,
  Contact,
};

// Setup associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
