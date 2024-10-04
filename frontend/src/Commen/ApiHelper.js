import axios from "axios"

class ApiHelper{
    constructor(){
        this.baseURL = "http://localhost:5000"

    }

    ListCategory(){
        return axios.get(`${this.baseURL}/category`)
    }
    AddCategory(data){
        return axios.post(`${this.baseURL}/category`, data)
    }
    UpdateCategory(data){
        return axios.put(`${this.baseURL}/category`, data)
    }
    DeleteCategory(id){
        return axios.delete(`${this.baseURL}/category/${id}`)
    }   

    ListProduct(){
        return axios.get(`${this.baseURL}/product`)
    }
    AddProduct(data){
        return axios.post(`${this.baseURL}/product`, data)
    }
    UpdateProduct(data){
       
        return axios.put(`${this.baseURL}/product`, data)
    }
    DeleteProduct(id){
        return axios.delete(`${this.baseURL}/product/${id}`)
    }

    fetchGallery(){
        return axios.get(`${this.baseURL}/file`)
    }
    UploadFile(file){
        return axios.post(`${this.baseURL}/file`, file)
    }
    deleteFile(ids){  
        return axios.post(`${this.baseURL}/file/delete`, {ids:ids})

    }

}

const apiHelper = new ApiHelper()
export default apiHelper