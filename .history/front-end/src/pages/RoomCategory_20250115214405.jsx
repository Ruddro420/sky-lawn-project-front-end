import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const RoomCategory = () => {
    const [category, setCategory] = useState([]); // Holds the list of categories
    const [getCategory, setGetCategory] = useState(""); // Input for adding a new category
    const [editCategoryId, setEditCategoryId] = useState(null); // ID of the category being edited
    const [editCategoryName, setEditCategoryName] = useState(""); // Input for editing a category
    const [loading, setLoading] = useState(true); // Loader for fetching data

    // Fetch categories
    const fetchCategories = () => {
        setLoading(true);
        axios
            .get("http://192.168.1.9:8000/api/room-category")
            .then((response) => {
                setCategory(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    // Fetch categories on component load
    useEffect(() => {
        fetchCategories();
    }, []);

    // Add a new category
    const addCategory = (e) => {
        e.preventDefault();
        if (!getCategory.trim()) {
            toast.error("Category name cannot be empty!");
            return;
        }
        axios
            .post("http://192.168.1.9:8000/api/room-category/add", { name: getCategory })
            .then(() => {
                toast.success("Category added successfully!");
                setGetCategory("");
                fetchCategories(); // Refresh the category list
            })
            .catch((error) => {
                console.log(error);
                toast.error("Failed to add category!");
            });
    };

    // Edit a category
    const editCategory = (id, name) => {
        setEditCategoryId(id);
        setEditCategoryName(name);
    };

    const saveCategoryEdit = () => {
        axios
            .put(`http://192.168.1.9:8000/api/room-category/${editCategoryId}`, { name: editCategoryName })
            .then(() => {
                toast.success("Category updated successfully!");
                setEditCategoryId(null);
                setEditCategoryName("");
                fetchCategories(); // Refresh the category list
            })
            .catch((error) => {
                console.log(error);
                toast.error("Failed to update category!");
            });
    };

    // Delete a category
    const deleteCategory = (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            axios
                .delete(`http://192.168.1.9:8000/api/room-category/delete/${id}`)
                .then(() => {
                    toast.success("Category deleted successfully!");
                    fetchCategories(); // Refresh the category list
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Failed to delete category!");
                });
        }
    };

    return (
        <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row">
                    {/* Add Category Form */}
                    <div className="col-12">
                        <div className="card mb-4">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Add Category</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={addCategory}>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="basic-default-fullname">
                                            Category Name
                                        </label>
                                        <input
                                            onChange={(e) => setGetCategory(e.target.value)}
                                            value={getCategory}
                                            type="text"
                                            className="form-control"
                                            id="basic-default-fullname"
                                            placeholder="Enter Category Name"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Add
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Categories Table */}
                    <div className="col-12">
                        <div className="card mb-4">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Room Categories</h5>
                            </div>
                            <div className="card-body">
                                {loading ? (
                                    <p>Loading...</p>
                                ) : (
                                    <div className="table-responsive text-nowrap">
                                        <table className="table order-4">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-border-bottom-0">
                                                {category.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            {editCategoryId === item.id ? (
                                                                <input
                                                                    type="text"
                                                                    value={editCategoryName}
                                                                    onChange={(e) => setEditCategoryName(e.target.value)}
                                                                    className="form-control"
                                                                />
                                                            ) : (
                                                                <span>{item.name}</span>
                                                            )}
                                                        </td>
                                                        <td>
                                                            {editCategoryId === item.id ? (
                                                                <button
                                                                    className="btn btn-sm btn-success"
                                                                    onClick={saveCategoryEdit}
                                                                >
                                                                    Save
                                                                </button>
                                                            ) : (
                                                                <>
                                                                    <button
                                                                        className="btn btn-sm btn-primary"
                                                                        onClick={() => editCategory(item.id, item.name)}
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        className="btn btn-sm btn-danger ms-2"
                                                                        onClick={() => deleteCategory(item.id)}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
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
s