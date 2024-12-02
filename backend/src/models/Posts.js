const { DB } = require('../config/db')

const createPosts = async (titulo, img, descripcion) => {
    const SqlQuery = "INSERT INTO posts values (DEFAULT, $1, $2, $3) RETURNING *"
    const SqlValues = [titulo, img, descripcion]
    const { rowCount, rows } = await DB.query(SqlQuery, SqlValues)

    return {
        rowCount, 
        rows
    }
}

const readAllPosts = async () => {
    const SqlQuery = "SELECT * from posts ORDER BY ID DESC"
    const { rowCount, rows } = await DB.query(SqlQuery)

    return {
        rowCount, 
        rows
    }
}

module.exports = {
    createPosts,
    readAllPosts
}