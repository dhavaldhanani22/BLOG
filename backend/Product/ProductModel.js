const { default: mongoose } = require("mongoose")

class ProductModel {
    constructor(){
        this.schema = new mongoose.Schema({
            name:{type:String, required:true},
            alias:{type:String, required:true, unique:true},
            category:{type:mongoose.Types.ObjectId, required:true,ref:"tbl_Category"}
        },{
            timeseries:true
        })
        this.model = mongoose.model("tbl_Products", this.schema)
    }

    addProduct(data){
        return this.model.create(data)
    }
    updateProduct(data){
        return this.model.updateOne({_id:data._id},{name:data.name,alias:data.alias,category:data.category})
    }
    deleteProduct(id){
        return this.model.deleteOne({_id:id})
    }
    
    getProduct(){
        return this.model.find().populate({
            path: 'category',
            select: '_id name',
            options: { lean: true }
        })
    }
}



const productModel = new ProductModel()
module.exports = productModel