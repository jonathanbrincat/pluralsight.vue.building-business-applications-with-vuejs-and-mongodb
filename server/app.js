const express = require('express')
const app = express()
const api = require('./api')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(cors)
app.use('/api', api)
app.use(express.static('static'))

app.use(morgan('dev'))

app.use(function(request, response, next) {
  const error = new Error('Not found')
  error.status = 404
  response.json(error)
})

app.set('port', process.env.PORT || 8081)

mongoose.connect('mongodb://localhost:27017/globomantics')
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Connected to MondoDB')

  app.listen(app.get('port'), () => {
    console.log('API Server Listening on port ' + app.get('port'))
  })
})
