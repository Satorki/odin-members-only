const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    user: "satorki",
    database: "members_only",
    password: "9856",
    port: 5432,
});

module.exports = pool;
