import sequelize from "./database/connection.js";
import app from "./app.js";

async function main() {
  try {
    await sequelize.sync({ force: false });
    app.listen(4001, () => {
      console.log("Server is listening on port 4001");
    });
  } catch (error) {
    console.error("Server Error: ", error);
  }
}

main();
