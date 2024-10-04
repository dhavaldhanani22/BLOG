import { Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import apiHelper from "../../Commen/ApiHelper";
import { useEffect, useState } from "react";
import ManageCategory from "./ManageCategory";
import { Delete, Edit } from "@mui/icons-material";

export default function CategoryScreen() {
    const [open, setOpen] = useState(false);
    const [Rows, setRows] = useState([])
    const initDetails = {
        name: "",
        alias: ""
    }
    const [categoryDetails, setcategoryDetails] = useState(initDetails)


    const Listcategory = async () => {
        try {
            const result = await apiHelper.ListCategory()
            setRows(result.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        Listcategory()
    }, [])

    const DeleteHandeler = async (id) => {
        try {
            if (!window.confirm("Are You Sure To Remove This Category.")) {
                return
            }
            await apiHelper.DeleteCategory(id)
            Listcategory()
        } catch (error) {
            console.log(error);
        }
    }


    const columns = [
        { field: "_id", headerName: "Id", width: 200 },
        { field: "name", headerName: "Name", width: 200 },
        { field: "alias", headerName: "Alias", width: 200 },
        {
            field: "Actions", headerName: "Actions", flex: 1, renderCell: (cell) => {
                return <>
                    <IconButton color="primary" onClick={() => {
                        setcategoryDetails({
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
            <ManageCategory Listcategory={Listcategory} categoryDetails={categoryDetails} setcategoryDetails={setcategoryDetails} open={open} setOpen={setOpen} />
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="fw-bold">Category</h2>
                <Button variant="outlined" onClick={() => {
                    setcategoryDetails(initDetails)
                    setOpen(true)

                }}>Add Category</Button>
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