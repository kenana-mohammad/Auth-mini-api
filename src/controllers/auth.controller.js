const User = require("../models/User");
const cookiesService = require("../utils/cookiesService");
const jwtService = require("../utils/jwtService");
const passwordService = require("../utils/PasswordService");

class AuthController {
    register = async(req, res) => {
            const { name, email, password } = req.body;
            const hashed = await passwordService.hash(password);
            let user = await User.create({
                name,
                email,
                password: hashed
            });
            user = user.toObject();
            delete user.password;
            return res.status(201).json({
                msg: "Register Done",
                user: user
            })
        }
        //=====
    login = async(req, res) => {
            const { email, password } = req.body;
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json("invalid credentials")
            }
            //compare password 
            const isVerified = await passwordService.compare(password, user.password);
            if (!isVerified) {
                return res.status(400).json("invalid credentials")


            }
            user = user.toObject();
            delete user.password;
            const token = jwtService.sign({
                _id: user._id,
                // to use in middleware to check the role of user

                role: user.role,
                email: user.emai
            });
            //set token in cookies 
            cookiesService.setData(res, 'access-token', token);
            return res.status(201).json({ user })

        }
        ///logout 
    logout = async(req, res) => {
            //clear token 
            cookiesService.clearData(res, "access-token");
            return res.status(201).json('logout is succesfully')

        }
        //getProfile
    profile = async(req, res) => {
        //fetch id from user req
        const userId = req._user._id;
        const user = await User.findById(userId).select('-password');
        return res.status(200).json({
            msg: "get profile",
            profile: user
        })


    }
}
module.exports = new AuthController()