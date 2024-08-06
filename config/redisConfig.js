require("dotenv").config();
const { createClient } = require("redis");

const client = createClient();

(async () => {
  try {
    await client.connect(process.env.REDIS_URI);

    console.log("connection to redis success");
  } catch (err) {
    throw err;
  }
})();

module.exports = client;
