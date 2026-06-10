const cookieConfig = {
    httpOnly: true,
    secure: false, //https
    maxAge: 15 * 60 * 1000,
    sameSite: 'strict'

}
class CookiesService {
    getData = (req, key) => {
        return req.cookies[key]
    }

    setData = (res, key, value) => {
        return res.cookie(key, value, cookieConfig)
    }

    clearData = (res, key) => {
        return res.clearCookie(key)

    }
}
module.exports = new CookiesService();