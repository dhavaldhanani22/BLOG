import { Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import apiHelper from "../../Commen/ApiHelper";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ContextMenu from "../ContextMenu";



export default function GalleryScreen() {
    const [Medias, setMedias] = useState([])
    const [selectMedia,setselectMedia] = useState({})
    const [ContextOpen, setContextOpen] = useState("")
    
  



    async function getMedias() {
        try {
            const result = await apiHelper.fetchGallery()
            setMedias(result.data.data)
        } catch (error) {
            console.log(error);
        }
    }
     

    useEffect(() => {
        getMedias()

       

    }, [])
      
    

    const UploadHandeler = async (e) => {
        try {
            let file = e.target.files[0]
            const formData = new FormData()
            formData.append("file", file)
            await apiHelper.UploadFile(formData)
            getMedias()
        } catch (error) {
            console.log(error);
        }
    }





    const SelectHandeler =(fileDetails) => {
        const data ={...selectMedia}
        
     if(data[fileDetails._id]){
        delete data[fileDetails._id] 
     }else{
        data[fileDetails._id]=fileDetails
     }

        setselectMedia({...data})

    }


    const DeleteHandler = async()=>{
      try {
        if(!window.confirm("Are you sure to delete this media's ? ")){
            return
        }
       
        const ids = Object.keys(selectMedia)
        await apiHelper.deleteFile(ids)
        setselectMedia({})
        getMedias()
  
        
      } catch (error) {
    
        
      }

    }
    //  document.body.addEventListener("click",()=>{
    //     setContextOpen("")
    //  })

    // document.addEventListener()
    
    window.addEventListener("click",()=>{
      setContextOpen("")
    })
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="fw-bold">Blog Gallery</h2>
                <Button disabled={Object.keys(selectMedia).length <=0} onClick={DeleteHandler} color="error" variant="outlined" > Delete </Button>
            </div>
 
            <hr />
            <div className="row">
                <div className="col-12 col-md-4 col-lg-3 mb-3">
                    <IconButton color="primary" style={{ width: "100%", height: "250px", borderRadius: 0, backgroundColor: "primary", border: "3px dashed #1976d2" }}>
                        <label htmlFor="file" style={{ width: "100%", height: "250px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <input onChange={UploadHandeler} type="file" id="file" hidden={true}></input>
                            <AddAPhotoIcon style={{ fontSize: "4rem" }} />
                        </label>
                    </IconButton>
                </div>

                {
                    Medias.map((x) => {
                        return <div style={{position:"relative",top:0,left:0}} key={x._id} className="col-12 col-md-4 col-lg-3 mb-3">
                           {
                            ContextOpen=== x._id ? <ContextMenu id = {x._id} url={x.url} getMedias={getMedias   }/>:""
                           }
                            <img 
                            onContextMenu={(e)=>{
                                e.preventDefault()
                              setContextOpen(x._id)
                            }}
                            style={{border:selectMedia[x._id]? "2px solid #1976d2": "none"}}
                            onClick={()=>SelectHandeler(x)}src={x.url} alt={x.name} width={"100%"} height={"250px"} />
                        </div>


                    })
                }
            </div>
        </>
    )
}