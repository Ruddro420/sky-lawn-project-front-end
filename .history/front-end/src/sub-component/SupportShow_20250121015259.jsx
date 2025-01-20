/* eslint-disable react/prop-types */

const SupportShow = ({ data, loading, deleteRoom }) => {
    return (
        <div>
            {/* Pree - Booking Details */}
            <div className="col-12">
                <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Ticket Status</h5>
                    </div>
                    <div className="card-body">
                        <div className="col-12">
                            <div className=" mb-4">
                                <div className="">
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : (
                                        <div className="table-responsive text-nowrap">
                                            {
                                                data[0].length == 0 ? <div className="alert alert-warning" role="alert">
                                                    No Data Found
                                                </div> : <table className="table order-4">
                                                    <thead>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Subject</th>
                                                            <th>Phone</th>
                                                            <th>Status</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody className="table-border-bottom-0">
                                                        {data[0].map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{item.name} </td>
                                                                <td>{item.subject} </td>
                                                                <td>{item.phone} </td>
                                                                <td>{item.status == 0 ? 'Pending' : 'Closed'} </td>
                                                                <td>
                                                                    <button onClick={() => { deleteRoom(item.id) }} className="btn btn-danger ms-2">Delete</button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            }

                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupportShow;