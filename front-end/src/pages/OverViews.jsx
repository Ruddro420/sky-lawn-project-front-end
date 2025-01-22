import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const OverViews = () => {
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [type, setType] = useState('')
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    // fetch data
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const handleSubmit = () => {

        setLoading(true);
        axios
            .post(`${BASE_URL}/date/range/report`, {
                start_date: start,
                end_date: end,
                booking: type,
            })
            .then((response) => {
                setData(response.data.data);
                toast.success("Generating Report!");
                //setGetCategory("");
                //fetchCategories(); // Refresh the category list
                //fetchRoom();
            })
            .catch((error) => {
                console.log(error);
                toast.error("Something wrong!");
            });

    }
    // get api 





    return (
        <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
                <h5>Booking Analytics</h5>
                <div className="mt-5">
                    <div className="row mb-3">
                        <div className="col-md-3">
                            <label htmlFor="startDate">Start Date</label>
                            <input
                                onChange={(e) => setStart(e.target.value)}
                                type="date"
                                className="form-control"
                                value={start}
                                id="startDate" />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="endDate">End Date</label>
                            <input
                                onChange={(e) => setEnd(e.target.value)}
                                value={end}
                                type="date"
                                className="form-control"
                                id="endDate" />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="bookingType">Booking Type</label>
                            <select
                                onChange={(e) => setType(e.target.value)}
                                className="form-control"
                                id="bookingType">
                                <option value="">Select Booking Type</option>
                                <option value="pre_booking">Pre Booking</option>
                                <option value="booking">Booking</option>
                            </select>
                        </div>
                        <div className="col-md-3 d-flex align-items-end">
                            <button onClick={handleSubmit} className="btn btn-primary" style={{ width: "100%" }}>Filter</button>
                        </div>
                    </div>


                    <hr />
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <h5>Total Count: <span id="totalCount">0</span></h5>
                        </div>
                        <div className="col-md-6">
                            <h5>Total Price: <span id="totalPrice">0.00 Taka</span></h5>
                        </div>
                    </div>
                    <hr />


                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Date</th>
                                <th>Booking Type</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody id="tableBody">

                        </tbody>
                    </table>
                </div>
            </div>

            <div className="content-backdrop fade"></div>
        </div>
    );
};

export default OverViews;