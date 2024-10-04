// import { Unpublished } from "@mui/icons-material";
import { Button, Switch,TextField } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";


export default function PostScreen(){

    const[BlogDetails,setBlogDetails]=useState({
        title:"",
        alias:"",
        product:'0',
        content:"",
        headerScript:"",
        bodyScript:"",
        metaTage:"",
        views:5000,
        featureImage:"",
        isPublished:true
    })

    console.log(BlogDetails.isPublished)

    return(
        <>
         <div className="d-flex flex-warp justify-content-between align-items-center mb-3">
            <h2 className="fw-bold">Add New Post</h2>
      <div>
        <lable htmlFor="publish">{BlogDetails.isPublished?"Publish":"Unpublish"}</lable>
      <Switch id="publish" onChange={()=>setBlogDetails({...BlogDetails,isPublished:!BlogDetails.isPublished})}checked ={BlogDetails.isPublished} />


      </div>
          
            <Button variant="outlined">Publish</Button>
           
        </div>
        <hr /> 
        <div className="row d-flex justify-content-between align-items-center">
            <div className="col-12 col-md-4 col-lg-4">
                <label style={{ color: "white" }} htmlFor="title" className='fw-bold'>Title</label>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    name="title"
                    type="text"
                    fullWidth
                    onChange={(e)=>setBlogDetails({...BlogDetails,title:e.target.value})}
                    variant="outlined"
                />
            </div>
            <div className="col-12 col-md-4">
                <label style={{ color: "white" }} htmlFor="title" className='fw-bold'>Alias</label>
                <TextField
                    autoFocus
                    margin="dense"
                    id="alias"
                    name="alias"
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={(e)=>setBlogDetails({...BlogDetails,alias:e.target.value})}
                />
            </div>
            
            <div className="col-12 col-md-4 ">
                <label  htmlFor="product" className="text-muted fw-bold">Product</label>
                <select onChange={(e)=>setBlogDetails({...BlogDetails,product:e.target.value})} name="product" id="product">
                <option value="0">--select product--</option>
                </select>
               
                
            </div>

            <div className="col-12 mb-2">
                <div className="row">
                <div className="col-12 col-md-8 mb-2">
                    <label  style={{ color: "white" }} htmlFor="content" className="text-muted">Content</label>

                    
                <Editor  
                            onKeyUp={(e,editor)=>{
                                
                               setBlogDetails({...BlogDetails,content:editor.getContent()})

                            }}                                           
                                      apiKey="0br 1siz57qb0y7dwnxtzccahui7x0el1mj2ygoziavfnzohu"
                                        init={{
                                            selector: 'textarea',
                                            height: 620,
                                            mobile: {
                                                theme: 'mobile',
                                                plugins: 'autosave lists autolink',
                                                toolbar: 'undo bold italic styleselect'
                                            },
                                            menubar: true,
                                            plugins: ['print preview paste importcss searchreplace autolink save directionality code visualblocks visualchars image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',],
                                            toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | preview save print | insertfile image media template link anchor code codesample | ltr rtl',
                                            content_style: 'body {font - family:Helvetica,Arial,sans-serif; font-size:14px }',
                                           
                                        }}
                                    />


                    </div>

                    <div className="col-12 col-md-4 ">
                        <div className="row">
                        <div className="col-12 mb-2 d-flex flex-column gap-2">
                        <label  style={{ color: "white" }}  className="text-muted fw-bold md-3 ">Feture Image</label>

                            <div style={{height:"250px",border:"2px solid blue",width:"100%"}}>

                            </div>
                            <Button variant="contained"fullWidth>Select Feture Image</Button>
                        </div>
                        <div className="col-12 mb-2">
                        <label htmlFor="views" style={{ color: "white" }}  className="text-muted fw-bold  ">Views</label>
                        <TextField
                    autoFocus
                    margin="dense"
                    id="views"
                    name="views"
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={(e)=>setBlogDetails({...BlogDetails,views:Number(e.target.value)})}
                />
                         
                        </div>

                        <div className="col-12 mb-2">
                        <label htmlFor="metaTages" style={{ color: "white" }}  className="text-muted fw-bold md-2  ">Meta Tages</label>
                        <textarea id="metaTage"onChange={(e)=> setBlogDetails({...BlogDetails,metaTage:e.target.value})} rows ={6} cols={3}></textarea>          
                        </div> 
                        </div>

                    </div>
                    <div className="col-12 col-md-6 mb-2">
                    <label htmlFor="headerScript" style={{ color: "white" }}  className="text-muted fw-bold md-3 ">Header Script</label>
                    <textarea id="headerScript" onChange={(e)=> setBlogDetails({...BlogDetails,headerScript:e.target.value})}rows ={6} cols={3}/>         
                    </div>
                    <div className="col-12 col-md-6">
                    <label htmlFor="bodyScript" style={{ color: "white" }}  className="text-muted fw-bold md-3 ">Body Script</label>
                    <textarea id="bodyScript"onChange={(e)=> setBlogDetails({...BlogDetails,bodyScript:e.target.value})} rows ={6} cols={3}/>       
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}