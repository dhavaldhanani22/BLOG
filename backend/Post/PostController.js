const { read } = require("fs")
const postModel = require("./PostModel")

class PostController{
    async addPost(req,res){
        try {
            const{title,alias,product,fetureImage,metaTage,headerScript,bodyScript,views,isPublished,content}=req.body

            if(!title || !alias || !product || ! fetureImage)return res.status(400).send({message:"Missing Dependency"})
            const result = await postModel.insertPost({...req.body})

            if(!result)return res.status(500).send({message:"Somthing went wrong"})
            return res.status(200).send({message:"Success"})




        } catch (error) {
            return res.status(500).send({message:"Internal server Error"})
            
        }

    }

    async updatePost(req,res){
        try {
            const {_id,title,alias,product,fetureImage,metaTage,headerScript,bodyScript,views,isPublished,content}= req.body


            if(!_id || !title || !alias || !product || ! fetureImage)return res.status(400).send({message:"Missing Dependency"})

            const result = await postModel.updatePost({...req.body})
            if(!result || result. modifiedCount <=0)return res.status(500).send({message:"Somthing went wrong"})
            return res.status(200).send({message:"Success"})
        
        } catch (error) {
            return res.status(500).send({message:"Internal server Error"})
            
        }
    }
    async getPost(req,res){
        try {
            const result = await postModel.fetchPost()
            if (!result)return res.status(500).send({message:"Somthing went wrong"})
            return res.status(200).send({message:"Success",data:result})
        } catch (error) {
            return res.status(500).send({message:"Internal server error"})
        }
    }

    async getPostById(req,res){
        try {
            const {id}= req.params
            const result = await postModel.fetchPostById(id)
            if (!result)return res.status(500).send({message:"Somthing went wrong"})
            return res.status(200).send({message:"Success",data:result})
        } catch (error) {
            return res.status(500).send({message:"Internal server error"})
            
        }

    }

    async DeletePost(req,res){
        try {
            const {id} = req.params
            const result = await postModel.deletPost(id)
            if (!result || result.deletedCount <=0)return res.status(500).send({message:"Somthing went wrong"})
            return res.status(200).send({message:"Success",data:result})
        } catch (error) {
            return res.status(500).send({message:"Internal server error"})
            
        }
    }
}
const postController = new PostController()
module.exports = postController