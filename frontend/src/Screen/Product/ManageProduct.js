import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import apiHelper from '../../Commen/ApiHelper';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';


export default function ManageProduct(props) {

    const { open, setOpen,ListProduct, productDetails, setproductDetails,category } = props

    //   const handleClickOpen = () => {
    //     setOpen(true);
    //   };

    const handleClose = () => {
        setOpen(false);
    };
   

    const changeHandeler =(e) => {
        const data = {...productDetails}
        data[e.target.name] = e.target.value
        setproductDetails({...data})
    }
 
    const InsertProduct = async() =>{
        try {
            if(!productDetails.name) return alert("Required Field Name is Empty")
            if(!productDetails.alias) return alert("Required Field Alias is Empty")
       
            await apiHelper.AddProduct({...productDetails})
            ListProduct()
            setOpen(false)
        } catch (error) {
            console.log(error);
        }
    }   

    const UpdateProduct = async() =>{
        try {
            if(!productDetails._id) return alert("Required Field _id is Empty")
            if(!productDetails.name) return alert("Required Field Name is Empty")
            if(!productDetails.alias) return alert("Required Field Alias is Empty")
       
            await apiHelper.UpdateProduct({...productDetails})
            ListProduct()
            setOpen(false)
        } catch (error) {
            console.log(error);
        }
    }    






    return (
        <div>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{productDetails._id ? "Update Product" : "Add New Product"}</DialogTitle>
                <hr className='m-0' />
                <DialogContent>
                    <label htmlFor="name" className='text-muted fw-bold'>Name</label>
                    <TextField
                    onChange={changeHandeler}
                        autoFocus
                        value={productDetails.name}
                        margin="dense"
                        id="name"
                        name="name"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <label htmlFor="alias" className='text-muted fw-bold'>Alias</label>
                    <TextField
                    onChange={changeHandeler}
                        autoFocus
                        value={productDetails.alias}
                        margin="dense"
                        id="alias"
                        name="alias"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <FormControl variant="filled" fullWidth className='w-100 mt-3'>
              <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
                 <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                onChange={(e) => setproductDetails({ ...productDetails, category: e.target.value })}
              >
                <MenuItem value="0"><em>None</em></MenuItem>
                {category?.map((x) => (
                  <MenuItem key={x._id}value={x._id}>{x.name}</MenuItem>
                ))}
              </Select>
              </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={productDetails._id ? UpdateProduct : InsertProduct}>{productDetails._id ? "Update" : "Add"}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}