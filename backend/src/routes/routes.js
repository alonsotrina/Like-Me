const { Router } = require('express')
const { handleCreatePost, handleGetPosts, handleDeletePosts, handleUpdatePosts } = require('../controllers/index')
const router = Router()

router.post("/posts", handleCreatePost)
router.get("/posts", handleGetPosts)
router.put("/posts/like/:id", handleUpdatePosts)
router.delete("/posts/:id", handleDeletePosts)

module.exports = router;