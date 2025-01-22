import { useEffect, useState } from 'react';
import './Invoice.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
const Invoice = () => {
    const { id } = useParams()

    const [getInvoice, setGetInvoice] = useState([])
    const [loading, setLoading] = useState(true);
    const [otheres, setOthers] = useState(0);
    const [food, setFood] = useState(0);
    const [discount, setDiscount] = useState(0);

    // env url
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    // get Booking details
    const fetchRoom = () => {
        setLoading(true);
        axios
            .get(`${BASE_URL}/booking-data/show/${id}`)
            .then((response) => {
                setGetInvoice(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    // Fetch room booking fetch
    useEffect(() => {
        fetchRoom();
    }, []);

    console.log(getInvoice);


    return (
        <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="">
                    <div className="">
                        <div className="tm_invoice_wrap">
                            <div className="tm_invoice tm_style2" id="tm_download_section">
                                <div className="tm_invoice_in">
                                    <div className="tm_invoice_content">
                                        <div className="tm_invoice_head tm_mb30">
                                            <div className="tm_invoice_left">
                                                <b className="tm_f30 tm_medium tm_primary_color">Invoice</b>
                                                <p className="tm_m0">Invoice Number - {getInvoice.invoice}</p>
                                            </div>
                                            <div className="tm_invoice_right tm_text_right">
                                                <b className="tm_f30 tm_medium tm_primary_color">Date</b>
                                                <p className="tm_m0">{new Date(getInvoice?.created_at).toLocaleString("en-bd", {
                                                    dateStyle: "medium",
                                                    timeStyle: "short",
                                                })}</p>
                                            </div>
                                        </div>
                                        <div className="tm_invoice_info tm_mb25">
                                            <div className="tm_invoice_info_left">
                                                <p className="tm_mb17">
                                                    <b className="tm_f18 tm_primary_color">SKY LAWN Hotel & Restaurant</b> <br />
                                                    R. K. Road. Islambag <br />  Rangpur<br />
                                                    <a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="a2cecdd5c7cecee2c5cfc3cbce8cc1cdcf">info@skylawnhotel</a> <br />
                                                    +88 01326085222
                                                </p>
                                            </div>
                                            <div className="tm_invoice_info_right">
                                                <div className="tm_grid_row tm_col_3 tm_col_2_sm tm_invoice_info_in tm_gray_bg tm_round_border">
                                                    <div>
                                                        <span>Check In:</span> <br />
                                                        <b className="tm_primary_color">{new Date(getInvoice?.checking_date_time).toLocaleString("en-bd", {
                                                            dateStyle: "medium",
                                                            timeStyle: "short",
                                                        })}</b>
                                                    </div>
                                                    <div>
                                                        <span>Check Out:</span> <br />
                                                        <b className="tm_primary_color">{new Date(getInvoice?.checkout_date_time).toLocaleString("en-bd", {
                                                            dateStyle: "medium",
                                                            timeStyle: "short",
                                                        })}</b>
                                                    </div>
                                                    <div>
                                                        <span>Booking ID:</span> <br />
                                                        <b className="tm_primary_color">{getInvoice.user_id}</b>
                                                    </div>
                                                    <div>
                                                        <span>Person:</span> <br />
                                                        <b className="tm_primary_color">{getInvoice.person}</b>
                                                    </div>
                                                    <div>
                                                        <span>Rooms No:</span> <br />
                                                        <b className="tm_primary_color">{getInvoice.room_number}</b>
                                                    </div>
                                                    <div>
                                                        <span>Room type:</span> <br />
                                                        <b className="tm_primary_color">{getInvoice.room_category}</b>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tm_grid_row tm_col_2 tm_invoice_info_in tm_round_border tm_mb30">
                                            <div className="tm_border_right tm_border_none_sm">
                                                <b className="tm_primary_color">Guest Info</b>
                                                <p className="tm_m0">Name: {getInvoice.name} <br />Phone: {getInvoice.mobile}</p>
                                            </div>
                                            <div>
                                                <b className="tm_primary_color">Business Details:</b>
                                                <p className="tm_m0">Company: {getInvoice.company} <br />Comming From: {getInvoice.comming_form}</p>
                                            </div>
                                        </div>
                                        <div className="tm_table tm_style1">
                                            <div className="tm_round_border">
                                                <div className="tm_table_responsive">
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th className="tm_width_6 tm_semi_bold tm_primary_color">Name</th>
                                                                <th className="tm_width_2 tm_semi_bold tm_primary_color"> Price</th>
                                                                <th className="tm_width_2 tm_semi_bold tm_primary_color">Total Price</th>
                                                                <th className="tm_width_2 tm_semi_bold tm_primary_color tm_text_right">Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="tm_width_6">{getInvoice.room_number} - {getInvoice.room_category}</td>
                                                                <td className="tm_width_2"> ৳ {getInvoice.room_price}</td>
                                                                <td className="tm_width_2"> ৳ {getInvoice.total_price}</td>
                                                                <td className="tm_width_2 tm_text_right"> ৳{getInvoice.total_price}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="tm_width_6">Restaurant Cost</td>
                                                                <td contentEditable="true" className="tm_width_2"> </td>
                                                                <td className="tm_width_2" contentEditable="true"></td>
                                                                <td className="tm_width_2 tm_text_right">
                                                                    <input className='custom-input-data' value={food} type="number" onChange={(e) => setFood(e.target.value)} />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="tm_width_6">Others Cost</td>
                                                                <td contentEditable="true" className="tm_width_2"> </td>
                                                                <td className="tm_width_2" contentEditable="true"> </td>
                                                                <td className="tm_width_2 tm_text_right">
                                                                    <input className='custom-input-data' value={otheres} type="number" onChange={(e) => setOthers(e.target.value)} />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="tm_width_6">Discount</td>
                                                                <td contentEditable="true" className="tm_width_2"> </td>
                                                                <td className="tm_width_2" contentEditable="true"> </td>
                                                                <td className="tm_width_2 tm_text_right">
                                                                    <input className='custom-input-data' value={otheres} type="number" onChange={(e) => setOthers(e.target.value)} />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="tm_invoice_footer tm_mb15">
                                                <div className="tm_left_footer">
                                                    <p className="tm_mb2"><b className="tm_primary_color">Payment info:</b></p>
                                                    <p className="tm_m0">{getInvoice.name} <br />Payment Method - {getInvoice.payment_method}   <br /> </p>
                                                </div>
                                                <div className="tm_right_footer">
                                                    <table className="tm_mb15">
                                                        <tbody>
                                                            <tr>
                                                                <td className="tm_width_3 tm_primary_color tm_border_none tm_bold">Subtoal</td>
                                                                <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_bold"> ৳1000</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="tm_width_3 tm_danger_color tm_border_none tm_pt0">Discount 100%</td>
                                                                <td className="tm_width_3 tm_danger_color tm_text_right tm_border_none tm_pt0">- ৳100</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="tm_width_3 tm_primary_color tm_border_none tm_pt0">Tax 5%</td>
                                                                <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">+ ৳50</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="tm_width_3 tm_border_top_0 tm_bold tm_f18 tm_primary_color tm_gray_bg tm_radius_6_0_0_6">Grand Total	</td>
                                                                <td className="tm_width_3 tm_border_top_0 tm_bold tm_f18 tm_primary_color tm_text_right tm_gray_bg tm_radius_0_6_6_0"> ৳950</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="tm_invoice_footer tm_type1">
                                                <div className="tm_left_footer"></div>
                                                <div className="tm_right_footer">
                                                    <div className="tm_sign tm_text_center">
                                                        <img src="assets/img/sign.svg" alt="" />
                                                        <p className="tm_m0 tm_ternary_color">Samiul</p>
                                                        <p className="tm_m0 tm_f16 tm_primary_color">Residence Manager</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tm_note tm_text_center tm_font_style_normal">
                                            <hr className="tm_mb15" />
                                            <p className="tm_mb2"><b className="tm_primary_color">Terms & Conditions:</b></p>
                                            <p className="tm_m0">If you want to cancel the booking please inform us before 3 days, otherwise, you will not get any refund. <br />Invoice was created on a computer and is valid without the signature and seal.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tm_invoice_btns tm_hide_print">
                                <a href="javascript:window.print()" className="tm_invoice_btn tm_color1">
                                    <span className="tm_btn_icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><path d="M384 368h24a40.12 40.12 0 0040-40V168a40.12 40.12 0 00-40-40H104a40.12 40.12 0 00-40 40v160a40.12 40.12 0 0040 40h24" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32" /><rect x="128" y="240" width="256" height="208" rx="24.32" ry="24.32" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32" /><path d="M384 128v-24a40.12 40.12 0 00-40-40H168a40.12 40.12 0 00-40 40v24" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32" /><circle cx="392" cy="184" r="24" fill='currentColor' /></svg>
                                    </span>
                                    <span className="tm_btn_text">Print</span>
                                </a>
                                <button id="tm_download_btn" className="tm_invoice_btn tm_color2">
                                    <span className="tm_btn_icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><path d="M320 336h76c55 0 100-21.21 100-75.6s-53-73.47-96-75.6C391.11 99.74 329 48 256 48c-69 0-113.44 45.79-128 91.2-60 5.7-112 35.88-112 98.4S70 336 136 336h56M192 400.1l64 63.9 64-63.9M256 224v224.03" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" /></svg>
                                    </span>
                                    <span className="tm_btn_text">Download</span>
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Invoice;