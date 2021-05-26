const express = require('express')
const router = express.Router()
const validUrl = require('valid-url')
const config = require('config')
const nanoid  = require('nanoid')
const Url = require('../models/Url')

router.get('/', (req, res) => {
  res.render('index')
})

// @route POST /shorten
// @desc  Create short URL
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body
  const baseUrl = config.get('baseUrl')

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid base url')
  }
  //Check long url
  if(!validUrl.isUri(longUrl)) {
    if (longUrl.length === 0) {
        const wrongMsg = 'There is no valid character in your input.'
        return res.render('index', {wrongMsg})
      } else{
        const wrongMsg = 'This is not valid URL.'
        return res.render('index', {wrongMsg}) 
      }
  }
   // 確認長網址，防止有重覆的網址組合出現
  try {
    let url = await Url.findOne({ longUrl })
      
    if(url) {
      let urlCode = url.urlCode
      let shortUrl = baseUrl + '/' + urlCode
      res.render('index', {shortUrl})
    } else {
      let urlCode = nanoid(5)
      let shortUrl = baseUrl + '/' + urlCode
      url = new Url({
        longUrl,
        shortUrl,
        urlCode,
        date: new Date
      })

      await url.save()
      res.render('index', {shortUrl})
    }

  } catch (error) {
    console.error(error)
    res.status(500).json('Server error')
  }
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