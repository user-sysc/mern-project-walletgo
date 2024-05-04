import Sequelize from "sequelize";

const sequelize = new Sequelize("walletgo_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;

// import mysql from "mysql";

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "walletgo_db",
// });

// export default db;
