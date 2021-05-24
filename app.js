const express = require('express')
const app = express()
const port = 3000
const connectDB = require('./config/mongoose')

// Connect to database
connectDB()

// allow to accept json data into api
app.use(express.json({ extended: true }))

// define Router
app.use('/', require('./routes/index'))
app.use('/api/url', require('./routes/url'))


app.listen(port, ()=>{
  console.log(`App is running on http://localhost:${port}`)
})