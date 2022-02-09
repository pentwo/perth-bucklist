const express = require('express')
const router = express.Router()

const listController = require('../controllers/listController')

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Steven API Base 2022' })
})

router.get('/bucket', listController.getList)
// router.get('/bucket/search/:search', listController.searchList)

router.get('/bucket/:id', listController.readMyList)
router.post('/bucket/:id', listController.saveMyList)

module.exports = router
