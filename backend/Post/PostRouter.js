const express = require("express")
const postController = require("./PostController")


const PostRouter = express.Router()

PostRouter.post("/",postController.addPost)
PostRouter.put("/",postController.updatePost)
PostRouter.get("/",postController.getPost)
PostRouter.get("/:id",postController.getPost)
PostRouter.delete("/:id",postController.DeletePost)




module.exports = PostRouter