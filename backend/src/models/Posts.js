const { DB } = require('../config/db')

const createPosts = async (titulo, img, descripcion) => {
    try {
        const SqlQuery = "INSERT INTO posts values (DEFAULT, $1, $2, $3) RETURNING *"
        const SqlValues = [titulo, img, descripcion]
        const { rowCount, rows } = await DB.query(SqlQuery, SqlValues)
    
        return {
            rowCount, 
            rows
        }
    } catch (error) {
        console.error("Error en createPosts:", error.message);
        throw { code: 500, message: "Error interno al crear el post" };
    }
}

const readAllPosts = async () => {
    try {
        const SqlQuery = "SELECT * from posts ORDER BY ID DESC"
        const { rowCount, rows } = await DB.query(SqlQuery)
    
        return {
            rowCount, 
            rows
        }
        
    } catch (error) {
        console.error("Error en readAllPosts:", error.message);
        throw { code: 500, message: "Error interno al obtener los posts" };
    }
}

const updatePosts = async (likes, id) => {
    try {
        const SqlQuery = "UPDATE posts SET likes = $1 WHERE id = $2 RETURNING *"
        const SqlValues = [likes, id]
        const { rowCount, rows } = await DB.query(SqlQuery, SqlValues)

        if(rowCount === 0){
            throw {code: 404, message:"No se encontro el ID para eliminar"}
        }

        return rows[0]
    } catch (error) {
        throw error
    }
}


const deletePosts = async (id) => {
    try {
        const SqlQuery = "DELETE FROM posts WHERE id = $1 RETURNING *"
        const SqlValues = [id]
        const { rowCount, rows } = await DB.query(SqlQuery, SqlValues)

        if(rowCount === 0){
            throw {code: 404, message:"No se encontro el ID para para realizar el DELETE"}
        }
        return rows[0];
        
    } catch (error) {
        throw error
    }
}

module.exports = {
    createPosts,
    readAllPosts,
    deletePosts,
    updatePosts
}