
const Invoice = () => {
    return (

        // <!-- Container -->


        <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="container-fluid invoice-container">

                    <header>
                        <div className="row align-items-center gy-3">
                            <div className="col-sm-7 text-center text-sm-start"> <img id="logo" src="img/5-stars.png" title="Koice" alt="Koice" width="80px" /> </div>
                            <div className="col-sm-5 text-center text-sm-end">
                                <h4 className="mb-0">Invoice</h4>
                                <p className="mb-0">Invoice Number - 16835</p>
                            </div>
                        </div>
                        <hr />
                    </header>

                    {/* <!-- Main Content --> */}

                    <div className="row">
                        <div className="col-sm-6 mb-3"> <strong>Guest Name:</strong> <span> S M Samiul Hasan </span> </div>
                        <div className="col-sm-6 mb-3 text-sm-end"> <strong>Booking Date:</strong> <span>07/11/2025</span> </div>
                    </div>
                    <hr className="mt-0" />
                    <div className="row">
                        <div className="col-sm-5"> <strong>Hotel Details:</strong>
                            <address>
                                SKY LAWN HOTEL<br />
                                Islambag, R. K. Road<br />
                                Rangpur<br />
                                Bangladesh
                            </address>
                        </div>
                        <div className="col-sm-7">
                            <div className="row">
                                <div className="col-sm-4"> <strong>Check In:</strong>
                                    <p>08/12/2020</p>
                                </div>
                                <div className="col-sm-4"> <strong>Check Out:</strong>
                                    <p>08/14/2020</p>
                                </div>
                                <div className="col-sm-4"> <strong>Rooms:</strong>
                                    <p>1</p>
                                </div>
                                <div className="col-sm-4"> <strong>Booking ID:</strong>
                                    <p>HQM3912704</p>
                                </div>
                                <div className="col-sm-4"> <strong>Payment Mode:</strong>
                                    <p>Credit Card</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table border mb-0">
                            <thead>
                                <tr className="bg-light">
                                    <td className="col-6"><strong>Description</strong></td>
                                    <td className="col-4 text-end"><strong>Rate</strong></td>
                                    <td className="col-2 text-end"><strong>Amount</strong></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="col-6">Room Charges</td>
                                    <td className="col-4 text-end">৳250.00 X 2 Night X 1 Rooms</td>
                                    <td className="col-2 text-end">৳500.00</td>
                                </tr>
                                <tr>
                                    <td>Other Charges</td>
                                    <td className="text-end">0</td>
                                    <td className="text-end">0</td>
                                </tr>
                                <tr>
                                    <td>Promotional Code</td>
                                    <td className="text-end">SUMMERFUN - <span className="text-1">20.00% One Time Discount</span></td>
                                    <td className="text-end">-৳100.00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="table-responsive">
                        <table className="table border border-top-0 mb-0">
                            <tr className="bg-light">
                                <td colSpan="2" className="text-end"><strong>Sub Total:</strong></td>
                                <td className="col-sm-2 text-end">৳400.00</td>
                            </tr>
                            <tr className="bg-light">
                                <td colSpan="2" className="text-end"><strong>Tax:</strong></td>
                                <td className="col-sm-2 text-end">৳40.00</td>
                            </tr>
                            <tr className="bg-light">
                                <td colSpan="2" className="text-end border-bottom-0"><strong>Total:</strong></td>
                                <td className="col-sm-2 text-end border-bottom-0">৳440.00</td>
                            </tr>
                        </table>
                    </div>
                    <br />
                    <p className="text-1 text-muted"><strong>Please Note:</strong> Amount payable is inclusive of central & state goods & services Tax act applicable slab rates. Please ask Hotel for invoice at the time of check-out.</p>
                    <div>
                        <div className="text-center">
                            <div>
                                <hr />
                                <p className="lh-base"><strong>Koice Inc.</strong><br />
                                    4th Floor, Plot No.22, Above Public Park,
                                     San Diego CA 2028. </p>
                                <hr />
                                <p className="text-1"><strong>NOTE :</strong> This is computer generated receipt and does not require physical signature.</p>
                            </div>
                            <div className="btn-group btn-group-sm d-print-none"> <a href="javascript:window.print()" className="btn btn-primary border text-white shadow-none"><i className="fa fa-print"></i> Print & Download</a> </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Invoice;