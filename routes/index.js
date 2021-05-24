const express = require('express')
const router = express.Router()

const Url = require('../models/Url')

router.get('/', (req, res) => {
  res.render('index')
})

// @route Get /:code
// @desc Redirect to long/original URL
router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code})
    if(url) {
      return res.redirect(url.longUrl)
    } else {
      return res.status(404).json('No url found')
    }
  } catch (error) {
    console.log(err)
    res.status(500).json('Server error')
  }
}) 

module.exports = router