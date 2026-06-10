//
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(express.json());
app.use(morgan('dev'))
    //========
const cors = require('cors')
app.use(cors({ origin: "*" }))
const cookies = require('cookie-parser');
app.use(cookies());
//ratelimit
const { limiter } = require('./middlewares/limiter');
app.use(limiter);
const MONGOOSE_URL = process.env.MONGOOSE_URL;
const mongoose = require('mongoose');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const PORT = process.env.PORT || 3000;
const xssSanitize = require('./middlewares/xss');
app.use(xssSanitize);
//========================================================


/////=================================
app.get('/api/health', (req, res) => {
    return res.status(200).json('the api is healthy')
});
//routes
app.use('/api/v1/auth', require('./routes/auth.routes'));
//protected routes
app.use('/api/v1/me', require('./routes/protected.routes'));
//admin
app.use('/api/v1/admin', require('./routes/admin.routes'));

app.use(notFound);
app.use(errorHandler);

mongoose.connect(MONGOOSE_URL)

.then(() => {
        app.listen(PORT, () => {
            console.log(`the Server is Running Port ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(`error ${error.message}`)
    })