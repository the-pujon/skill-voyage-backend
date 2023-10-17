const app = require("./app");
const config = require("./src/config/config");
const port = config.app.port;

app.listen(port, async (req, res) => {
  console.log(`Your server is running in http://localhost:${port}`)
});
