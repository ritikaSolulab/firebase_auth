const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const express = require("express");
const router = require('./routes/route');

// initializing csrf middleware
const csrfMiddleware = csrf({ cookie: true });

const PORT = process.env.PORT || 3000;
const app = express();

//ejs file rendering
app.engine("html", require("ejs").renderFile);
app.use(express.static("static"));

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(csrfMiddleware);

// initiliazing the routes
app.use('/', router);

app.all("*", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});

//listening on port 3000
app.listen(PORT, () => {
  console.log(`Listening on port:${PORT}`);
});