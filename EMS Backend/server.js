require("dotenv").config();
const express = require("express");
const cors=require("cors");
const app = express();
const mongoose=require("mongoose");

// const dns = require('dns');
// dns.setServers(['8.8.8.8', '1.1.1.1']);

const employeeRoutes = require("./routes/employeeRoutes");

const loggerMiddleware = require("./middleware/loggerMiddleware");


// Middlewarenpm i cors
app.use(cors());

app.use(express.json());

app.use(loggerMiddleware);


const dbURI = process.env.MONGO_URI || "mongodb+srv://adityashekhwat25_db_user:vSZpisMCFfWLnIjo@cluster0.ibrva0u.mongodb.net/";
mongoose.connect(dbURI)
.then(()=>{
  console.log("Connected to MongoDB");
})
.catch((err)=>{
  console.log(err);
});


// Routes

app.use("/employees", employeeRoutes);


app.get("/", (req, res) => {

  res.send("Employee Management API Running");

});

const PORT = process.env.PORT || 5100;
app.listen(PORT, () => {

  console.log(`Server Running on Port ${PORT}`);

});