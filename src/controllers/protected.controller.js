const User = require("../models/User");

class ProtectedController {
    welcome = async(req, res) => {
            const id = req._user._id;
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json('user is not found')
            }

            return res.status(200).json({
                msg: `welcome ${user.name}`
            })
        }
        ///===============
    accountSummary = async(req, res) => {
            const id = req._user._id;
            const user = await User.findById(id).select('-password -_id');
            if (!user) {
                return res.status(404).json('user is not found')
            }

            return res.status(200).json({
                msg: "summery Account",
                user: user
            })
        }
        ////overview only admin

    overview = async(req, res) => {
            const totalUsers = await User.countDocuments();
            res.status(200).json({
                success: true,
                data: {
                    totalUsers,
                    activeSessions: 5, // مثال لإحصائية وهمية
                    serverStatus: 'online'
                }
            });
        }
        //========
        //get=
    getUsers = async(req, res) => {
            const users = await User.find().select('-password');
            return res.status(200).json({
                msg: "get all users",
                users: users
            })
        }
        //remove 
    remove = async(req, res) => {
        const id = req.params.id;
        if (id === req._user._id) {
            return res.status(400).json({ msg: "Can't delete yourself" });
        }

        const user = await User.findById(id);
        if (!user) return res.status(404).json("the user noy found");
        await User.findByIdAndDelete(id);
        return res.status(200).json({
            msg: "deleted",
            data: null
        })
    }
}
module.exports = new ProtectedController();