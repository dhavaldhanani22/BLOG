const express = require("express")
const categoryController = require("./CategoryController")


const CategoryRouter = express.Router()


CategoryRouter.get("/", categoryController.getCategory)
CategoryRouter.post("/", categoryController.addCategory)
CategoryRouter.put("/", categoryController.updateCategory)
CategoryRouter.delete("/:id", categoryController.deleteCategory)




module.exports = CategoryRouter