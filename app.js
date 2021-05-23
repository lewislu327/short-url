const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/short-url',{ useNewUrlParser: true, useUnifiedTopology: true } )

const db = mongoose.connection

db.once('open', () => {
  console.log('mongodb error')
})
  
db.on('error', () => {
  console.log('mongodb connected')
}) 
  

app.listen(port, ()=>{
  console.log(`App is running on http://localhost:${port}`)
})