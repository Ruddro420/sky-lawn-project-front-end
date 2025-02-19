import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { jsPDF } from "jspdf";
import "jspdf-autotable";  // Ensure this is installed
import { useNavigate } from "react-router-dom";

const Report = () => {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [details, setDetails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);  // Default page size
    const [searchQuery, setSearchQuery] = useState('');  // Search query state
    const navigate = useNavigate();

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        axios
            .post(`${BASE_URL}/invoice/range/report`, {
                start_date: start,
                end_date: end,
                //booking: type,
                page: currentPage,
                page_size: pageSize,
            })
            .then((response) => {
                setData(response.data);
                setDetails(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                toast.error("Something went wrong!");
                setLoading(false);
            });
    };

    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(12);
        doc.text("Booking Report", 10, 10);

        const tableColumn = ["Date", "Name", "Phone", "Room Number", "Room Price"];
        const tableRows = details.map(item => [
            new Date(item?.date_time ? item?.date_time : item?.checking_date_time).toLocaleString("en-bd", {
                dateStyle: "medium",
                timeStyle: "short",
            }),
            item.name,
            item.phone ? item.phone : item.mobile,
            item.room_type,
            item.room_price,
        ]);

        doc.autoTable(tableColumn, tableRows);
        doc.save("Booking_Report.pdf");
    };

    // Handle search input
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter the details based on the search query
    const filteredDetails = details.filter(item => {
        return (
            (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.phone && item.phone.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.room_type && item.room_type.toString().includes(searchQuery)) ||
            (item.mobile && item.mobile.toString().includes(searchQuery)) ||
            (item.date_time && item.date_time.toString().includes(searchQuery)) ||
            (item.room_price && item.room_price.toString().includes(searchQuery))
        );
    });

     // Get invoice
    

     const handleDownload = (id) => {
        navigate(`/report/invoice/${id}`);
    };

    return (
        <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card p-4">
                    <h5>Checkout or Invoice Analytics</h5>
                    <div className="mt-3">
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-4">
                                <div className="col-md-5">
                                    <label htmlFor="startDate">Start Date</label>
                                    <input
                                        onChange={(e) => setStart(e.target.value)}
                                        type="date"
                                        className="form-control"
                                        value={start}
                                        id="startDate" required />
                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="endDate">End Date</label>
                                    <input
                                        onChange={(e) => setEnd(e.target.value)}
                                        value={end}
                                        type="date"
                                        className="form-control"
                                        id="endDate" required />
                                </div>
                                <div className="col-md-2 d-flex align-items-end">
                                    <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>Filter</button>
                                </div>
                            </div>
                        </form>

                        {/* Search Box */}
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <label htmlFor="search">Search</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="search"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    placeholder="Search by name, phone, or room number"
                                />
                            </div>
                        </div>

                        <hr />
                        <div className="row mb-3 mt-3">
                            <div className="col-md-6">
                                <h5 className="btn btn-outline-primary">Total Count: <span id="totalCount">{data.count ? data.count : 0}</span></h5>
                            </div>
                            <div className="col-md-6 text-end">
                                <h5 className="btn btn-outline-primary">Total Price: <span id="totalPrice">{data.total_price ? data.total_price : 0} Taka</span></h5>
                            </div>
                        </div>
                        <hr />

                        <button onClick={downloadPDF} className="btn btn-danger mb-3 mt-3">Download PDF</button>

                        <hr />
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>R.N</th>
                                    <th>R.P</th>
                                    <th>Paid</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredDetails.map(item => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{new Date(item?.date_time ? item?.date_time : item?.checking_date_time).toLocaleString("en-bd", {
                                                    dateStyle: "medium",
                                                    timeStyle: "short",
                                                })}</td>
                                                <td>{item.name}</td>
                                                <td>{item.phone ? item.phone : item.mobile}</td>
                                                <td>{item.room_type}</td>
                                                <td>{item.room_price}</td>
                                                <td>{item.final_amount}</td>
                                                <td> <button onClick={() => handleDownload(item.invoice)} className="btn btn-primary">downloadPDF</button> </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Report;
