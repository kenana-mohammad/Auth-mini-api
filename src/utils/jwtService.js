const jwt = require('jsonwebtoken');
class JwtService {
    //genrate token
    sign(payload) {
            return jwt.sign(payload, process.env.JWT_SECRET_KEY, {

                expiresIn: '1h'
            })
        }
        //verify
    verify(token) {
        return jwt.verify(token, process.env.JWT_SECRET_KEY)
    }
}
module.exports = new JwtService();