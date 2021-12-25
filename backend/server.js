const express = require('express')
//const bodyParser = require('body-parser') dont need in express latest version
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.port || 5000

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI
mongoose.connect(uri , {useNewUrlParser : true, useCreateIndex : true, useUnifiedTopology : true})

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('connection established successfully')
})

const exercisesRouter = require('./routes/exercise');

const usersRouter = require('./routes/user');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});