require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors=require('cors')
// Port in Use
const PORT = 3001

// Setting up the Mongodb connection
const DBConnection = require('./config/DBConnection')

// calling the DATABASE
DBConnection()

// built in middleware to handle urlencoded form-dara
app.use(express.urlencoded({ extended: true,limit:'100mb' }))

// built in middleware for json
app.use(express.json({limit:'100mb'}))
app.use(cors())
// routes
app.use('/employee', require('./routes/Employee'))
app.use('/admin', require('./routes/Admin'))
app.use('/patient', require('./routes/Patient'))
app.use(
  '/register',
  require('./routes/UserRegister'),
  require('./routes/EmployeeRegister')
)
app.use('/auth', require('./routes/EmployeeAuth'), require('./routes/UserAuth'))
app.use('/hospital', require('./routes/Hospital'))
app.use('/branch', require('./routes/Branch'))
app.use('/department', require('./routes/Department'))
app.use('/ward',require('./routes/Ward'))
app.use('/bed',require('./routes/Bed'))
app.use('/labReport',require('./routes/LabReport'))
mongoose.connection.once('open', function () {
  console.log('connected to mongodb')
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
})
