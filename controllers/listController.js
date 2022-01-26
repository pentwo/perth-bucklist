var mysql = require('mysql2')
require('dotenv').config()

var con = mysql.createConnection({
  host: process.env.MYSQL_SERVER,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'bucket'
})

exports.getList = async (req, res, next) => {
  const limit = req.query.limit ? req.query.limit : 5
  const offset = req.query.offset ? req.query.offset : 0

  const queryText = `
    SELECT *
    FROM bucketlist1
    LIMIT ${limit} OFFSET ${offset}`

  try {
    var result = await con.promise().query(queryText)

    res.json(result)
  } catch (error) {
    console.error('Error:', error)
  }
}
exports.searchList = async (req, res, next) => {
  const limit = req.query.limit ? req.query.limit : 5
  const offset = req.query.offset ? req.query.offset : 0

  const searchTerm = encodeURIComponent(req.params.search)
  const queryText = `
    SELECT *
    FROM bucketlist1
    WHERE description LIKE '%${searchTerm}%
    LIMIT ${limit} OFFSET ${offset}'`

  try {
    var result = await con.promise().query(queryText)

    res.json(result)
  } catch (error) {
    console.error('Error:', error)
  }
}
