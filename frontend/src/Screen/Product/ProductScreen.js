import { Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import apiHelper from "../../Commen/ApiHelper";
import { useEffect, useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import ManageProduct from "./ManageProduct";

export default function ProductScreen() {
    const [open, setOpen] = useState(false);
    const [category, setcategory] = useState([])
    const [Rows, setRows] = useState([])
    const initDetails = {
        name: "",
        alias: "",
        category: ""

        
    }
   
    const [productDetails, setproductDetails] = useState(initDetails)


    const ListProduct = async () => {
        try {
            const result = await apiHelper.ListProduct()
            setRows(result.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    

    const getcategory = async () => {
        try {
            const result = await apiHelper.ListCategory()
            setcategory(result.data.data)
        } catch (error) {
            console.log(error);
        }
    }
      
    useEffect(() => {
        ListProduct()
        getcategory()
    }, [])

    const DeleteHandeler = async (id) => {
        try {
            if (!window.confirm("Are You Sure To Remove This Product.")) {
                return
            }
            await apiHelper.DeleteProduct(id)
            ListProduct()
        } catch (error) {
            console.log(error);
        }
    }

    const columns = [
        { field: "_id", headerName: "Id", width: 200 },
        { field: "name", headerName: "Product Name", width: 200 },
        { field: "alias", headerName: "Alias", width: 200 },
        {
            field: "category", headerName: "Category", width: 200, renderCell: (cell) => {
                return cell.row.category?.name
            }
        },

        {
            field: "Actions", headerName: "Actions", flex: 1, renderCell: (cell) => {
                return <>
                    <IconButton color="primary" onClick={() => {
                        setproductDetails({
                            name: cell.row.name,
                            alias: cell.row.alias,
                            _id: cell.row._id
                        })
                        setOpen(true)
                    }}>
                        <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => DeleteHandeler(cell.row._id)}>
                        <Delete />
                    </IconButton>

                </>
            }
        }
    ]
    return (
        <>
            <ManageProduct ListProduct={ListProduct} setcategory={setcategory} category={category} productDetails={productDetails} setproductDetails={setproductDetails} open={open} setOpen={setOpen} />
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="fw-bold">Product</h2>
                <Button variant="outlined" onClick={() => {
                    setproductDetails(initDetails)
                    setOpen(true)

                }}>Add Product</Button>
            </div>
            <div className="row">
                <div className="col-12">
                    <DataGrid
                        getRowId={(e) => e._id}
                        rows={[...Rows]}
                        columns={columns}
                        // initialState={{
                        //     pagination: {
                        //         paginationModel: { page: 0, pageSize: 5 },
                        //     },
                        // }}
                        autoHeight={true}  
                    />
                </div>
            </div>
        </>

    )


}