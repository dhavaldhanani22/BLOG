const { default: mongoose, Schema } = require("mongoose");

class PostModel {
    constructor(){
        this.schema = new mongoose.Schema({
            title:{type:String,required:true},
            views:{type:Number,required:true,default:0},
            alias:{type:String,required:true},
            product:{type:Schema.Types.ObjectId,required:true,ref:"tbl_Product"},
            fetureImage:{type:Schema.Types.ObjectId,required:true, ref:"tbl_file"},
            content:{type:String, default:null},
            content:{type:String, default:null},
            content:{type:String, default:null},
            metaTage:{type:String, default:null},
            headerScript:{type:String, default:null},
            bodyScript:{type:String, default:null},
            isPublised:{type:Boolean, default:true},


        },{
                timestamps:true
        })

        this.model = mongoose.model("tbl_posts",this.schema)
    }
    insertPost(data){
        return this.model.create({title:data.title,alias:data.alias,views:data.views,product:data.product,fetureImage:data.fetureImage,content:data.content || null,
        metaTage:data.metaTage || null , headerScript:data.headerScript || null,isPublised:data.isPublised})

    }
    updatePost(data){
        return this.model.updateOne({_id:data._id}),{title:data.title,alias:data.alias,views:data.views,product:data.product,fetureImage:data.fetureImage,content:data.content || null,
            metaTage:data.metaTage || null , headerScript:data.headerScript || null,isPublised:data.isPublised}
    }

    fetchPost(){
        return this.model.find()
    }

    fetchPostById(){
        return this.model.findOne({_id:id})
    }
    deletPost(id){
        return this.model.deleteOne({_id:id})
    }
}

const postModel = new PostModel()
module.exports = postModel
