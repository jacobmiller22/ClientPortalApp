const express = require("express");
const keys = require("./config/keys");
const app = express();

app.use(express.json());

require("./routes/userRoutes")(app);
require("./routes/fileRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
