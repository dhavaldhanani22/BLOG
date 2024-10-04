import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import apiHelper from '../../Commen/ApiHelper';


export default function ManageCategory(props) {

    const { open, setOpen,Listcategory, categoryDetails, setcategoryDetails } = props

    //   const handleClickOpen = () => {
    //     setOpen(true);
    //   };

    const handleClose = () => {
        setOpen(false);
    };
   

    const changeHandeler =(e) => {
        const data = {...categoryDetails}
        data[e.target.name] = e.target.value
        setcategoryDetails({...data})
    }


 
    const InsertCategory = async() =>{
        try {
            if(!categoryDetails.name) return alert("Required Field Name is Empty")
                
            if(!categoryDetails.alias) return alert("Required Field Alias is Empty")
       
            await apiHelper.AddCategory({...categoryDetails})
            Listcategory()
            setOpen(false)
        } catch (error) {
            console.log(error);
            // alert('Failed to insert category. Please try again.');
        }
    }   

    const UpdateCategory = async() =>{
        try {
            if(!categoryDetails._id) return alert("Required Field _id is Empty")
            if(!categoryDetails.name) return alert("Required Field Name is Empty")
            if(!categoryDetails.alias) return alert("Required Field Alias is Empty")
       
            await apiHelper.UpdateCategory({...categoryDetails})
            Listcategory()
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
                <DialogTitle>{categoryDetails._id ? "Update Category" : "Add New Category"}</DialogTitle>
                <hr className='m-0' />
                <DialogContent>
                    <label htmlFor="name" className='text-muted fw-bold'>Name</label>
                    <TextField
                    onChange={changeHandeler}
                        autoFocus
                        value={categoryDetails.name}
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
                        value={categoryDetails.alias}
                        margin="dense" 
                        id="alias"
                        name="alias"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={categoryDetails._id ? UpdateCategory : InsertCategory}>{categoryDetails._id ? "Update" : "Add"}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}