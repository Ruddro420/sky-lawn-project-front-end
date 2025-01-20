
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
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Room Number
                                                    </label>
                                                    <input
                                                        name="room_number"
                                                        type="number"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Room Number"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Room Name
                                                    </label>
                                                    <input
                                                        name="room_name"
                                                        type="number"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Enter Category Name"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Select Room Category
                                                    </label>
                                                    <select className="form-control" name="room_category_id" id="">
                                                        <option value="">Select Room Category</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Room Price / 2 Person
                                                    </label>
                                                    <input
                                                        name="price"
                                                        type="number"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Room Price"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="row mb-3">
                                                    <label className="col-sm-2 form-label" htmlFor="basic-icon-default-message">Message</label>
                                                    <div className="col-sm-10">
                                                        <div className="input-group input-group-merge">
                                                            <span id="basic-icon-default-message2" className="input-group-text"
                                                            ><i className="bx bx-comment"></i
                                                            ></span>
                                                            <textarea
                                                                id="basic-icon-default-message"
                                                                className="form-control"
                                                                placeholder="Hi, Do you have a moment to talk Joe?"
                                                                aria-label="Hi, Do you have a moment to talk Joe?"
                                                                aria-describedby="basic-icon-default-message2"
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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