const express = require('express')
const router = express.Router()

const listController = require('../controllers/listController')

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Steven API Base 2022' })
})

router.get('/bucket', listController.getList)
router.get('/bucket/:search', listController.searchList)

module.exports = router
