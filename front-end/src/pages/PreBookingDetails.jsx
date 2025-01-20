import axios from "axios";
import { useEffect, useState } from "react";

const PreBookingDetails = () => {

    const [category, setCategory] = useState([]);
        const [room, setRoom] = useState([]);
        const [loading, setLoading] = useState(true);

    const fetchCategories = () => {
        setLoading(true);
        axios
            .get("http://192.168.0.115:8000/api/room-category")
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


     // get preBookdata details
     const fetchRoom = () => {
        setLoading(true);
        axios
            .get("http://192.168.0.115:8000/api/prebook-data")
            .then((response) => {
                setRoom(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    // Fetch room fetch
    useEffect(() => {
        fetchRoom();
    }, []);
    return (
        <div>
            {/* Pree - Booking Details */}
            <div className="col-12">
                <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Pre Booking Details</h5>
                    </div>
                    

                    <div className="card-body">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="table-responsive text-nowrap">
                                {
                                    category.length == 0 ? <div className="alert alert-warning" role="alert">
                                        No Data Found
                                    </div> : <table className="table order-4 border">
                                        <thead>
                                            <tr>
                                                <th>Number</th>
                                                <th>Name</th>
                                                <th>Category</th>
                                                <th>Price</th>
                                                <th>Features</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody className="table-border-bottom-0">
                                            {room.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.room_number} </td>
                                                    <td>{item.room_name} </td>
                                                    <td>{item.category.name} </td>
                                                    <td>{item.price} </td>
                                                    <td>{item.feature} </td>
                                                    <td>{item.status} </td>
                                                    <td>
                                                        <button className="btn btn-success">Edit</button>
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
    );
};

export default PreBookingDetails;