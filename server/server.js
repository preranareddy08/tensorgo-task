require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const bodyParser = require("body-parser");
const authRoute = require("./routes/authRoute");
const invoiceRoute = require("./routes/invoiceRoute");
const billingRoute = require("./routes/billingRoute");
const usageRoute = require("./routes/usageRoute");
const session = require("express-session");
const passportStrategy = require("./passport");

const app = express();

app.use(
  session({
    secret: "cyberwolve",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // onee day
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use("/auth", authRoute);

app.use("/invoice", invoiceRoute);

app.use("/usage", usageRoute);

app.use("/billing", billingRoute);

const port = 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
