const cookiesService = require("../utils/cookiesService");
const jwtService = require("../utils/jwtService");

const auth = (req, res, next) => {
    try {
        const token = cookiesService.getData(req, 'access-token');
        if (!token) {
            return res.status(403).json({
                msg: "Not Authorized"
            });
        };
        //verify to send information to api 
        const decoded = jwtService.verify(token);
        //send data to api to use it in profile or role
        req._user = {...decoded }
        next()

    } catch (error) {
        return res.status(403).json({
            msg: "Not Authorized"
        })
    }

}
module.exports = auth