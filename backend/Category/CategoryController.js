const categoryModel = require("./CategoryModel")

class CategoryController{
  async addCategory(req,res){
    try {
        const {name,alias} = req.body

        if (!name || !alias) return res.status(400).send({message:"Missing Depndency"})
        const result = await categoryModel.addCategory({...req.body})
        if(!result) return res.status(500).send({message:"Somthing Went Wrong"})
        return res.status(200).send({message:"Success"})
        
    } catch (error) {
        return res.status(500).send({message:"Internal Server error"})
    }
  }

  async updateCategory(req,res){
    try {
        const {name, alias, _id} = req.body

        if(!name || !alias || !_id) return res.status(400).send({message:"Missing Depndency"})
        const result = await categoryModel.updateCategory({...req.body})
        if(!result || result.modifiedCount <= 0) return res.status(500).send({message:"Somthing Went Wrong"})
        return res.status(200).send({message:"Success"})
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:"Internal Server error"})
    }
  }

  async deleteCategory(req,res){
    try {
        const {id}  = req.params
        if (!id) return res.status(400).send({message:"Missing Depndency"})

        const result = await categoryModel.deleteCategory(id)
        if(!result || result.deletedCount <= 0) return res.status(500).send({message:"Somthing Went Wrong"})
        return res.status(200).send({message:"Success"})
    } catch (error) {
        return res.status(500).send({message:"Internal Server error"})
    }
  }


  async getCategory(req,res){
    try {
        const result = await categoryModel.getCategory()
        if(!result) return res.status(500).send({message:"Somthing Went Wrong"})
        return res.status(200).send({message:"Success", data:result})
    } catch (error) {
        return res.status(500).send({message:"Internal Server error"}) 
    }
  }

}

const categoryController = new CategoryController()

module.exports = categoryController