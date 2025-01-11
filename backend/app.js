const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser')
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path:path.join(__dirname,"config/config.env")});
//sachin
app.use(express.json());
app.use(cookieParser());

const customerdatas = require('./routes/customerroutes')
const customersdatas = require('./routes/customersroutes')



app.use('/api/v1/',customerdatas);
app.use('/api/v1/',customersdatas);

app.use(errorMiddleware)
module.exports = app;
