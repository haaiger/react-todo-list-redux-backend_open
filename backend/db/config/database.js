require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_USERPASSWORD,
    database: process.env.DATABASE,
    host: "127.0.0.1",
    port: process.env.DB_PORT,
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    use_env_variable: "PG_URI",
    dialect: "postgres",
  },
};
