const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
// console.log("Resolved .env path:", path.resolve(__dirname, "../../.env"));

// dotenv.config({ path: "/.env" }); 

const connstr ="mongodb+srv://Jayadir:jayadir2346@cluster0.zkziucs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" ;
// console.log("Connection String:", connstr);
const connect = () => {
  mongoose
    .connect(connstr)
    .then(() => {
      console.log("connection successful");
    })
    .catch((e) => {
      console.log(e.message);
    });
};
module.exports = connect;
