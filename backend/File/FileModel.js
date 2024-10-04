const { default: mongoose } = require("mongoose");

class FileModel {
    constructor(){
        this.schema = new mongoose.Schema({
            name:{type:String, required:true},
            path:{type:String, required:true},
            ext:{type:String, required:true},
            mimType:{type:String, required:true}

        },{
            timestamps:true
        })
        this.model = mongoose.model("tbl_file", this.schema)
    }
}

const fileModel = new FileModel()
module.exports = fileModel