var express = require('express')
var router = express.Router()
var mysql = require('mysql2')
require('dotenv').config()

var con = mysql.createConnection({
  host: process.env.MYSQL_SERVER,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'bucket',
})

const getList = async (req, res, next) => {
  try {
    var result = await con.promise().query('SELECT * FROM bucketlist1 LIMIT 5')
    res.json(result)
  } catch (error) {
    console.error('Error:', error)
  }
}
const searchList = async (req, res, next) => {
  try {
    const searchTerm = encodeURIComponent(req.params.search)
    const q = `SELECT * FROM bucketlist1 WHERE description LIKE '%${searchTerm}%'`
    console.log(q)
    var result = await con.promise().query(q)
    res.json(result)
  } catch (error) {
    console.error('Error:', error)
  }
}

router.get('/bucket', getList)
router.get('/bucket/:search', searchList)

module.exports = router
