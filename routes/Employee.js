const express = require('express')
const app = express.Router()
app
  .route('/')
  .get(async (req, res) => {})
  .post(async (req, res) => {})
app.route('/:id').get(async (req, res) => {})
module.exports = app
