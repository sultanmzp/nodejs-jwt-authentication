const express = require('express');
const dotenv = require('dotenv'); //importing for .env file use
const connectDB = require('./utils/db_connection');//importing connect DB
const userRoute = require('./routes/user.route')
const cookieParser = require('cookie-parser');


//Configuaring dot .env
dotenv.config({});

//creating app
const app = express();
const PORT = process.env.PORT || 3200;


// Middleware to parse JSON bodies(when we got JSON formated file)
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse URL-encoded bodies (for forms)
app.use(express.urlencoded({ extended: true }));


//using routes

//API's
//equal to "http://localhost:3200/api/v1/user/(register/login/profileupdate)"
app.use("/api/v1/user",userRoute);



app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);

    //Used to connect to the database
    connectDB();
});