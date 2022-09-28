const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const bodyParser = require('body-parser');
const connectDb = require('./Database/dbConnect');
const user = require('./Routes/User')
const meal = require('./Routes/Meal')
const errorHandler = require('./Middleware/Error');
const app = express();

/// database connect
// const url = 'mongodb://localhost/MealLoggingApp';
connectDb(process.env.URL)



const urlEncoded = bodyParser.urlencoded({extended:false});
app.use(urlEncoded)
app.use(express.json())
///api route setup
app.use('/api/v1',user);
app.use('/api/v1',meal);


app.use(errorHandler)
app.listen(process.env.PORT || 8081,()=>(
    console.log(`server is running on Port ${process.env.PORT || 8081}`)
));