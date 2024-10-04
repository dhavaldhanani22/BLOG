const randomString = require("randomstring")
const fileModel = require("./FileModel")
const fs = require("fs")


const fileUpload = (file) => {



    let name = randomString.generate({
        length: 12,
        charset: "alphabetic"
    })
    let ext = file.name.split(".")
    ext = ext[ext.length - 1]
    let path = "/public/images/"
    let mimType = file.mimetype.split("/")
    mimType = mimType[0]
    mimType = (mimType === "image" || mimType === "video" || mimType === "audio") ? mimType : "document"
    path += name
    path += "."
    path += ext
    file.mv(`.${path}`)
    return {
        path,
        ext,
        name: name + "." + ext,
        mimType

    }
}

const DeleteFile = async (path) => {
    return new Promise((resolve, reject) => {
        fs.unlink(path, (err) => {
            if (err) return reject(err)
            return resolve(true)

        })
    })
}


class FileController {
    async create(req, res) {

        try {
            const { file } = req.files
            let fileDetails;

            if (!file.length) {
                fileDetails = fileUpload(file)
            } else {
                let i = 0
                fileDetails = []
                while (i < file.length) {
                    let tmp = fileUpload(file[i])
                    fileDetails.push(tmp)
                    i++
                }
            }

            let result;
            if (!fileDetails.length) {
                result = await fileModel.model.create({ ...fileDetails })
            } else {
                result = await fileModel.model.insertMany({ ...fileDetails })
            }

            if (!result) return res.status(500).send({ message: "Somthing Went Worng" })

            return res.status(200).send({ message: "Success" })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal Server error" })

        }


    }

    async getFiles(req, res) {
        try {
            const result = await fileModel.model.find({}, {
                path: true,
                name: true,
                ext: true,
                mimType: true,
                createdAt: true,
                url: {
                    $concat: ["http://localhost:5000", "$path"]
                }
            }).sort({ createdAt: -1 })

            if (!result) return res.status(500).send({ message: "Somthing Went Worng" })
            return res.status(200).send({ message: "Success", data: result })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal Server error" })

        }
    }

    async DeleteFiles(req, res) {
        try {

            const { ids } = req.body
            let deletedCount = 0
            if (ids.length <= 0) return res.status(400).send({ message: "Missing dependency" })
            const fileDetails = await fileModel.model.find({ _id: ids })
            if (!fileDetails) return res.status(500).send({ message: "Somthing went wrong" })
            let i = 0
            while (i < fileDetails.length) {
                let tmp = fs.unlinkSync("." + fileDetails[i].path)
                console.log(tmp);
                deletedCount++

                // let tmp  = await DeleteFile("." +  fileDetails[i].path)
                // if(tmp){
                //     deletedCount++
                // }
                i++

            }

            if (deletedCount !== ids.length) {

                return res.status(500).send({ message: "Somthing went wrong" })

            }

            const result = await fileModel.model.deleteMany({ _id: ids })


            if (!result || result.deletedCount !== deletedCount) {
                console.log(result, result.deletedCount, deletedCount);
                return res.status(500).send({ message: "Somthing went wrong" })
            }

            return res.status(200).send({ message: "Success" })


        } catch (error) {
            return res.status(500).send({ message: "Internal server error" })

        }

    }
}



const fileController = new FileController()
module.exports = fileController