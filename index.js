require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");
const userRoutes = require("./views/users")
const productRoutes = require("./views/product")

const app = express();

const port = 8080;

//middlewares


app.use(bodyParser.json())
app.use(cookieParser()) 

// connecting to mongo DB

mongoose
  .connect( process.env.DATABASE  , {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  }).catch(err => {console.log(err)} )

app.get("/" , (req,res) => { res.json("ITS WORKINGGGGGGGG")  }   )

// routes 

app.use("/api",userRoutes);
app.use("/api", productRoutes)

// listening to port

app.listen( port , () => {console.log(`server started on ${port}`)}  )