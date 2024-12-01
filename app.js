let express = require("express");
let app = express();
const cors = require("cors");
const morgan = require("morgan");
let path = require("path");
let cookieparser = require("cookie-parser");

let User = require("./models/userModel");
let userRout = require("./routers/userRout");
let hallRout = require("./routers/hallrout");
let halluserRout = require("./routers/usersrout");
let bookingRout = require("./routers/bookingRout");
let viewrout = require("./routers/viewrout");
let viewhallrout = require("./routers/viewhallrout");
let requestRout = require("./routers/requestRout"); // Include your request route

// Middleware
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://127.0.0.1:3000",
    credentials: true,
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// View engine setup
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", viewrout);
app.use("/", viewhallrout);
app.use("/api/v1/matrimony", userRout);
app.use("/api/v2/hall", hallRout);
app.use("/api/v2/hallusers", halluserRout);
app.use("/api/v2/bookings", bookingRout);
app.use("/api/v1/matrimony", requestRout); // Add the request route here

module.exports = app;
