
const CreateRoom = () => {
    return (
        <div>
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
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="basic-default-fullname">
                                            Category Name
                                        </label>
                                        <input
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
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content-backdrop fade"></div>
        </div>
        </div>
    );
};

export default CreateRoom;