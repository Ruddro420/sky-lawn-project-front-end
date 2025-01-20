import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";

const RoomCategory = () => {
    const [category, setCategory] = useState([])
    const [getCategory, setGetCategory] = useState()
    const [load, setLoad] = useState(true)

    // post data
    const addCategory = (e) => {
        e.preventDefault();
        axios.post('http://192.168.1.9:8000/api/room-category/add', {
            name: getCategory,
        })
            .then(function (response) {
                toast.success('Successfully created!');
                setLoad(false)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    // get data
    useEffect(() => {
        axios.get('http://192.168.1.9:8000/api/room-category')
            .then(function (response) {
                setCategory(response.data);
                setLoad(true)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])


    return (
        <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row">
                    <div className="col-12">
                        <div className="card mb-4">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Add Category</h5>
                                {/*  <small className="text-muted float-end">Default label</small> */}
                            </div>
                            <div className="card-body">
                                <form onSubmit={addCategory}>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="basic-default-fullname">Category Name</label>
                                        <input onChange={(e) => setGetCategory(e.target.value)} type="text" className="form-control" id="basic-default-fullname" placeholder="Aparajita" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Send</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="card mb-4">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Room Category</h5>
                                {/*  <small className="text-muted float-end">Merged input group</small> */}
                            </div>
                            <div className="card-body">
                                <div className="">
                                    <div className="table-responsive text-nowrap">
                                        <table className="table order-4">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-border-bottom-0">

                                                {
                                                    load && category.map(item => {
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td><i className="fab fa-angular fa-lg text-danger"></i> {item.name}</td>
                                                                    <td>
                                                                        <button className="btn btn-sm btn-primary">Edit</button>
                                                                        <button className="btn btn-sm btn-success ms-2">Delete</button>
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        )
                                                    })
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content-backdrop fade"></div>
        </div>
    );
};

export default RoomCategory;