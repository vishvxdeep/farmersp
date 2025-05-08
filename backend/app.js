const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
mongoose.pluralize(null);
const cors = require("cors");

const fs = require("fs").promises;
const path = require("path");
const configPath = path.resolve(__dirname, "helpers", "config.json");

const machineId = require("node-machine-id");
let machineID; // Declare machineID variable
let license = "u3Y65£,;7Y#I";

// Get the machine ID
machineId
  .machineId()
  .then((id) => {
    machineID = id;
    //console.log('Machine ID:', id);
    //console.log('license ID:', license);
  })
  .catch((error) => {
    console.error("Error getting machine ID:", error);
  });

// Middleware to check for a valid license
app.use(async (req, res, next) => {
  try {
    const configData = await fs.readFile(configPath, "utf-8");
    const config = JSON.parse(configData);
    const storedLicense = config.license;

    if (
      storedLicense.licenseCode === license &&
      storedLicense.deviceId === machineID
    ) {
      //console.log('Valid license');
      next();
      // Send a success response
      //return res.json({ message: 'Valid license' });
    }
  } catch (error) {
    console.error(
      "Invalid or missing license information. Please verify the license."
    );
    process.exit(1); // Exit the application if the license is not valid
  }
});

require("dotenv").config();

app.use(cors());
app.options("*", cors());

//middleware
app.use(express.json());

//app.use(bodyParser.json());
app.use(morgan("tiny"));

//"email": "john.doe@example.com",
//"password": "yourpassword"

//Routes

const feedbackRoutes = require("./routes/feedback");
const requestRoutes = require("./routes/request");
const cropRoutes = require("./routes/crop");
const usersRoutes = require("./routes/users");
const harvestRoutes = require("./routes/harvest");
const rateRoutes = require("./routes/rate");
const serviceRoutes = require("./routes/service");
const croprequestRoutes = require("./routes/croprequest");

const api = process.env.API_URL;

app.use("/public", express.static("public"));
app.use(`${api}/crop`, cropRoutes);
app.use(`${api}/request`, requestRoutes);
app.use(`${api}/feedback`, feedbackRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/harvest`, harvestRoutes);
app.use(`${api}/rate`, rateRoutes);
app.use(`${api}/service`, serviceRoutes);
app.use(`${api}/croprequest`, croprequestRoutes);
app.use(express.static(path.join(__dirname,'/client/dist')))
//Render client
app.get('*',(req,res)=> res.sendFile(path.join(__dirname,"/client/dist/index.html")));

//CONNECTION_STRING = 'postgresql://farmerapp_user:WjxpSuSO8DS7bg9QBKLbHrI4soFWDumN@dpg-d0een5s9c44c73811190-a.oregon-postgres.render.com/farmerapp';
//  http://localhost:4000/api/v1/business/

//Database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "farmer_harvest",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

//Server
if(process.env.NODE_ENV === "production"){
  const dirPath = path.resolve();
  app.use(express.static(path.join(dirPath,'../client/build')));
  app.get("*",(req,res) => {
    res.sendFile(path.join(dirPath,'../client/build',"index.html"));
  })
}
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("server is running on port ${PORT}");
});

{
  
app.get("/message", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

}
