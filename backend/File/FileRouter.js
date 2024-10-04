const express = require("express")
const fileController = require("./FileController")




const fileRouter = express.Router()

fileRouter.post("/", fileController.create)
fileRouter.get("/", fileController.getFiles)
fileRouter.post("/delete", fileController.DeleteFiles)




module.exports = fileRouter