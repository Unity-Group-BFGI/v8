const express = require('express');
const dotenv = require('dotenv');
const cookieparser = require('cookie-parser');
const cors = require('cors');
const Ajv = require("ajv")




// middleware imports
const { getDb, connectToDb } = require('./db/mongodb');
const v1 = require("./routes/v1");


dotenv.config();
const app = express();
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieparser());


var db;
const PORT = process.env.PORT || 5000;


// db connection
try{
  connectToDb((err) => {
    if(!err){
      app.listen(PORT, () => {
        console.log(`Server is up and running on ${PORT} ...`);
      });
      db = getDb()
    }
  });
}catch(err){};

// db parse connection
app.use(function(req,res,next){
  if(db){
    req.db = db;
    req.ajv = ajv;
    next();
  } else {
    res.status(500).json({status: false, res: "could not connect to database"});
    return false;
  }
});

// secure requests
app.use(function(req,res,next){
  if(req.secure){
    next();
  } else {
    next();
  }
});



app.use("/v1", v1);
app.get("/", async (req,res) => {
    res.status(200).json({
      status: true,
      res: "you are connected"
    });
});

