const { createClient } = require("redis");

let client = createClient({
  url: "redis://localhost:6379",
});
client.on("error", (err) => console.log("Redis Error", err));

let redisconnect = async () => {
  await client.connect();
  console.log("Redis Connected");
};

module.exports = { client, redisconnect };
