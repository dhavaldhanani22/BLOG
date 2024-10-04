const express = require("express")
const productController = require("./ProductController")



const ProductRouter = express.Router()

ProductRouter.get("/", productController.getProduct)
ProductRouter.post("/", productController.addProduct)
ProductRouter.put("/", productController.updateProduct)
ProductRouter.delete("/:id", productController.deleteProduct)




module.exports = ProductRouter