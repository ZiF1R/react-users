const { Pool } = require('pg');

const pool = new Pool({
  user: "wogdltxfculmua",
  password: "1a899512e85f9c8d4437cd964912aa1ffc66dd533d4d86a09c8158d733f2d190",
  database: "dfle8pjbf5sb65",
  host: "ec2-34-248-169-69.eu-west-1.compute.amazonaws.com",
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;