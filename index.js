require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
// Port in Use
const PORT = 3001

// Setting up the Mongodb connection
const DBConnection = require('./config/DBConnection')

// calling the DATABASE
DBConnection()

// built in middleware to handle urlencoded form-dara
app.use(express.urlencoded({ extended: true }))

// built in middleware for json
app.use(express.json())

// routes
app.use('/employee', require('./routes/Employee'))
app.use('/admin', require('./routes/Admin'))

mongoose.connection.once('open', function () {
  console.log('connected to mongodb')
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
})
