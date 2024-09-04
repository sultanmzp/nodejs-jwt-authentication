const jwt = require('jsonwebtoken')

const isAuthenticated = async (req, res, next) => {
    try {
        //geting token from cookies whose name is 'token'
        const token = req.cookies?.token;

        //check if token is empty
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }
        
        //validating the token we get from cookies with our secret key of jwt
        const decode = await jwt.verify(token, process.env.SECRET_KEY_JWT);
        
        //checking if decode is empty
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }

        //assiging requested id which get after decoding, useful when id needed before logout
        req.id = decode.userId;

        //after everything successful pass it the next module/block/activity
        next();

    } catch (error) {
        return error
    }
}

module.exports = { isAuthenticated };