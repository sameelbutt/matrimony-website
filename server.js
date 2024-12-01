let dotenv = require("dotenv");
let mongoose = require("mongoose");
let app = require("./app");

dotenv.config({ path: "./config.env" });
let db = process.env.DATABASE;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connect"));
// console.log(process.env);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("start server");
});
