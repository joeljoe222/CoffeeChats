const mysql = require('mysql2');

var connection = mysql.createConnection({
  host     : process.env.MYSQL_HOST || '127.0.0.1',
  user     : process.env.MYSQL_USER || 'root',
  password : process.env.MYSQL_PASSWORD || 'lock',
  database : process.env.MYSQL_DATABASE || 'CoffeeChatsDB'
})

connection.connect()

function createPost(description, image_url, callback) {

    const query = `
    INSERT INTO posts (description, image_url)
    VALUES (?, ?)
    `
  
    const params = [description, image_url]
  
    connection.query(query, params, (error, result) => {
      if (error) {
        callback(error)
        return
      }
      callback(null, result.insertId)
    })
  }
  exports.createPost = createPost
  
  function getPosts(callback) {
    const query = `
    SELECT * FROM posts
    `
  
    connection.query(query, (error, results) => {
      if (error) {
        callback(error)
        return
      }
      callback(null, results)
    })
  }
  exports.getPosts = getPosts