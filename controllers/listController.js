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
    FROM ${process.env.MYSQL_TABLENAME}
    LIMIT ${limit} OFFSET ${offset}`

  try {
    var result = await con.promise().query(queryText)

    res.json(result[0])
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
    FROM ${process.env.MYSQL_TABLENAME}
    WHERE description LIKE '%${searchTerm}%
    LIMIT ${limit} OFFSET ${offset}'`

  try {
    var result = await con.promise().query(queryText)

    res.json(result[0])
  } catch (error) {
    console.error('Error:', error)
  }
}

exports.saveMyList = async (req, res) => {
  const uniqueID = req.params.id
  const title = req.body.title
  const data = JSON.stringify(req.body.list)

  const queryText = `
    INSERT INTO SavedList (id, title, list)
    VALUES ('${uniqueID}', '${title}', '${data}')
  `

  try {
    var result = await con.promise().query(queryText)
    res.json(req.body)
  } catch (error) {
    console.error('Error:', error)
  }
}

exports.readMyList = async (req, res, next) => {
  const uniqueID = req.params.id

  const queryText = `
  SELECT *
  FROM SavedList
  WHERE id =  '${uniqueID}';
  `

  try {
    var result = await con.promise().query(queryText)
    console.log('result: ', result[0])

    if (result[0].length < 1) {
      res.render('error', {
        error: {
          status: '404 Page Not Found',
          stack: 'ID incorrect'
        }
      })
    } else {
      res.json(result[0])
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
