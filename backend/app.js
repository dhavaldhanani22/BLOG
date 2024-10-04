const express = require("express")
const ConnectDb = require("./Connection")
const CategoryRouter = require("./Category/CategoryRouter")
const cors = require("cors")
const ProductRouter = require("./Product/ProductRouter")
const fileRouter = require("./File/FileRouter")
const fileUpload = require("express-fileupload")
const PostRouter = require("./Post/PostRouter")
require("dotenv").config();
const PORT = process.env.PORT || 3000;








const app = express()
ConnectDb()
app.use(cors())
app.use("/Public", express.static("./Public") )
app.use(express.json())
app.use(fileUpload())

app.use("/Category", CategoryRouter)
app.use("/product", ProductRouter)
app.use("/file", fileRouter)
app.use("/post",PostRouter)




// app.get("/", (req,res) =>{
//     return res.status(200).send({message:"Success"})
// })


app.listen(PORT, () =>{
    console.log(`Server Started at ${PORT}`)
})