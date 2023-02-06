require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const authRoute = require("./routes/authRoute");
const blogsRoute = require("./routes/blogsRoute");

require("./middleware/passportMiddleware");

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());

app.use("/api", authRoute);
app.use("/api/blogs", blogsRoute);

const startServer = () => {
  const PORT = process.env.PORT;
  try {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
