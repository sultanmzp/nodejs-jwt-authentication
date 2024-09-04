const USER = require('../models/user.model');//importing user model
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

//creating async function which will handle all activity related to Register User
const Register = async (req, res) => {

    try {

        //Getting the details which was send by user during Register
        const { name, email, password } = req.body; //alternate way is req.body.name etc
        //Here we write logics like password length, email validation, Is empty etc.

        //Checking if any field is empty
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }

        //check if user trying to register the email which is already exist
        const user = await USER.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exist",
                success: false
            })
        }

        //converting password into hash (before that import npm i bcryptjs)
        const hashedPassword = await bcrypt.hash(password, 10);

        //creating new user by using USER model, The varible and sequence should be same as defined in schema
        await USER.create({
            name, //alternate way is name=req.body.name
            email,
            password: hashedPassword //mapping hashed password as password
        });




        return res.status(200).json({
            message: "Account created successfully",
            success: true
        })

        //or if we want we can render the user on home/login page once user created successfully
        // return res.render('/login');

    } catch (error) {
        console.error(error.message);
    }
}

//async function handle the login related activity
const Login = async (req, res) => {

    try {

        //Getting the details which was send by user during Login
        const { email, password } = req.body; //alternate way is req.body.email etc
        //Here we write logics like password length, email validation, Is empty etc.


        //Checking if any field is empty
        if (!email || !password) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }

        //check if user exist of USER model
        let user = await USER.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User does not exist",
                success: false
            })
        }

        //check if user password correct
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "User does not exist",
                success: false
            })
        };

        //Adding user id as token data 
        const tokenData = {
            userId: user._id
        }

        //binding jwt data
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY_JWT, { expiresIn: '1d' });

        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.name}`,
            user,
            success: true
        });

        //or if we want we can render the user on home/login page once user login successfully
        // return res.render('/login');/.redirect

    } catch (error) {
        console.error(error.message);
    }
}

//for logout
const Logout = async (req, res) => {
    try {

        //make token empty and expiring with 0 value and
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: `Logout successful`,
            success: true
        });

        //Alternate way is--
        // return res.status(200).cookie("token", "", { maxAge: 0, httpOnly: true }).json({
        //     message: `Logout successful`,
        //     success: true
        // });
        

    } catch (err) {
        console.error(err.message)
    }
}

//exporting the Controllers
module.exports = {
    Register,
    Login,
    Logout,
}