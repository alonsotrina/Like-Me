const Posts = require('../models/Posts')

const handleCreatePost =  async (req, res) => {
    const { titulo, img, descripcion} = req.body
    const response = await Posts.createPosts(titulo, img, descripcion)

    res.status(200).json({
        msg: 'Post agregado con éxito!',
        data: response
    })
}

const handleGetPosts =  async (req, res) => {
    const response = await Posts.readAllPosts()
    
    res.status(200).json({
        msg: 'Listado de post',
        data: response
    })
}


module.exports = {
    handleCreatePost,
    handleGetPosts
}