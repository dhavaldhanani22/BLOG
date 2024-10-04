const productModel = require("./ProductModel")

class ProductController {
    async addProduct(req, res) {
        try {
            const { name, alias,category } = req.body
           
            if (!name || !alias || !category) return res.status(400).send({ message: "Missing Depndency" })
            const result = await productModel.addProduct({ ...req.body })
            if (!result) return res.status(500).send({ message: "Somthing Went Wrong" })
            return res.status(200).send({ message: "Success" })

        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal Server error" })
        }
    }

    async updateProduct(req, res) {
        try {
            const { name, alias,category, _id } = req.body

            if (!name || !alias || !_id || !category) return res.status(400).send({ message: "Missing Depndency" })
            const result = await productModel.updateProduct({ ...req.body })
            if (!result || result.modifiedCount <= 0) return res.status(500).send({ message: "Somthing Went Wrong" })
            return res.status(200).send({ message: "Success" })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal Server error" })
        }
    }



    

    async deleteProduct(req, res) {
        try {
            const { id } = req.params
            if (!id) return res.status(400).send({ message: "Missing Depndency" })

            const result = await productModel.deleteProduct(id)
            if (!result || result.deletedCount <= 0) return res.status(500).send({ message: "Somthing Went Wrong" })
            return res.status(200).send({ message: "Success" })
        } catch (error) {
            return res.status(500).send({ message: "Internal Server error" })
        }
    }

    async getProduct(req, res) {
        try {
            const result = await productModel.getProduct()
            if (!result) return res.status(500).send({ message: "Somthing Went Wrong" })
            return res.status(200).send({ message: "Success", data: result })
        } catch (error) {
            return res.status(500).send({ message: "Internal Server error" })
        
        }
    }
}

const productController = new ProductController()
module.exports = productController