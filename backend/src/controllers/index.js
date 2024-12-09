const Posts = require('../models/Posts')

const handleCreatePost =  async (req, res) => {
    const { titulo, img, descripcion} = req.body
    try {
        const response = await Posts.createPosts(titulo, img, descripcion)
    
        res.status(200).json({
            msg: 'Post agregado con éxito!',
            data: response
        })
    } catch (error) {
        console.error("Error al crear un POST:", error.message);
        res.status(500).json({ error: "Error al crear el post" });
    }
}

const handleGetPosts =  async (req, res) => {
    try {
        const response = await Posts.readAllPosts()
        
        res.status(200).json({
            msg: 'Listado de post cargada con exito',
            data: response
        })
    } catch (error) {
        console.error("Error en cargar la información:", error.message);
        res.status(500).json({ error: "Error al obtener los posts" });
    }
}

const handleUpdatePosts = async (req, res) => {
    const { id } = req.params
    const { likes } = req.body
    try {
        const response = await Posts.updatePosts(likes, id)
        
        res.status(200).json({
            msg: 'Post modificado con exito',
            data: response
        })
    } catch (error) {
        console.log(error)
        res.status(error.code).send(error.message)
    }
}

const handleDeletePosts =  async (req, res) => {
    const {id} = req.params

    try {
        const response = await Posts.deletePosts(id)

        res.status(200).json({
            msg: 'Post eliminado con exito!',
            data: response
        })
        
    } catch (error) {
        console.log("Error-->:", error)
        res.status(error.code).send(error.message)
    }
}


module.exports = {
    handleCreatePost,
    handleGetPosts,
    handleDeletePosts,
    handleUpdatePosts
}