import { useEffect, useState } from 'react';
import './Invoice.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";


const Invoice = () => {
    const { id } = useParams()
    const [getInvoice, setGetInvoice] = useState([])
    const [getDay, setGetDay] = useState([])
    const [loading, setLoading] = useState(true);
    const [otheres, setOthers] = useState(0);
    const [food, setFood] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [currentDate, setCurrentDate] = useState(getDate());
    
    console.log(getInvoice.total_price);
    

    // get current data
    function getDate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${month}/${date}/${year}`;
    }

    // env url
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    // get Booking details
    const fetchRoom = () => {
        setLoading(true);
        axios
            .get(`${BASE_URL}/booking-data/show/${id}`)
            .then((response) => {
                setGetInvoice(response.data.data);
                setGetDay(response.data)
                setTotalPrice(response.data.data.total_price)
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    console.log(getInvoice);

    // Fetch room booking fetch
    useEffect(() => {
        fetchRoom();
    }, []);


    const [totalPrice, setTotalPrice] = useState(getInvoice.total_price ? getInvoice.total_price : 0);

    /* invoice download start */
    const handleDownloadPDF = () => {

        // get subTotal
        let totalAmount = document.getElementById('subTotal').innerText;

        // post data
        axios
            .post(`${BASE_URL}/invoice/add`, {
                booking_id: getInvoice.user_id,
                invoice: getInvoice.invoice,
                name: getInvoice.name,
                profession: getInvoice.profession,
                company: getInvoice.company,
                mobile: getInvoice.mobile,
                checking_date_time: getInvoice.checking_date_time,
                checkout_date_time: getInvoice.checkout_date_time,
                room_type: getInvoice.room_number,
                person: getInvoice.person,
                comming_from: getInvoice.comming_form,
                room_price: getInvoice.room_price,
                duration: getInvoice.duration,
                total_price: getInvoice.total_price,
                advance: getInvoice.advance,
                discount: discount,
                final_amount: totalAmount,
                payment_status: getInvoice.payment_status,
                payment_method: getInvoice.payment_method,

            })
            .then(() => {
                toast.success("Generate Successfully!");
                // setGetCategory("");
                //fetchCategories(); // Refresh the category list
            })
            .catch((error) => {
                console.log(error);
                toast.error("Something Went Wrong!");
            });


        // check discount and food bill is emty not showing in my pdf file
        if (document.getElementById('resturant-cost') && food == 0) {
            document.getElementById('resturant-cost').style.display = 'none';
        }
        if (document.getElementById('other-cost') && otheres == 0) {
            document.getElementById('other-cost').style.display = 'none';
        }
        if (document.getElementById('discount-cost') && discount == 0) {
            document.getElementById('discount-cost').style.display = 'none';
        }


        // generate pdf
        const element = document.getElementById("tm_download_section");

        // Replace input fields with their values
        const inputs = element.querySelectorAll("input");
        inputs.forEach((input) => {
            const span = document.createElement("span");
            span.textContent = input.value || "0"; // Show zero if the field is empty
            span.style.fontFamily = "Arial, sans-serif"; // Ensure proper font rendering
            span.style.fontSize = getComputedStyle(input).fontSize;
            span.style.textAlign = getComputedStyle(input).textAlign;
            input.parentNode.replaceChild(span, input);
        });

        html2canvas(element, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            // const pdf = new jsPDF("p", "mm", "a4");
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "pt",  // Use points for accurate size
                format: [612, 792], // Letter size 
            });
            // const pdfWidth = pdf.internal.pageSize.getWidth();
            // const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            const pdfWidth = 612;
            const pdfHeight = 792;
            const marginTop = 106;
            pdf.addImage(imgData, "PNG", 0, marginTop, pdfWidth, pdfHeight - marginTop);
            pdf.save(`${getInvoice.invoice}-invoice.pdf`);

            // Revert spans back to input fields (optional, to restore the UI)
            inputs.forEach((input, index) => {
                const span = element.querySelectorAll("span")[index];
                input.parentNode.replaceChild(input, span);
            });
        });
    };


    console.log(getDay)
    return (
        <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="">
                    <div className="">
                        <div className="tm_invoice_btns tm_hide_print">

                            <button onClick={handleDownloadPDF} className="tm_invoice_btn invoiceprintbtn tm_color1">
                                <span className="tm_btn_icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><path d="M384 368h24a40.12 40.12 0 0040-40V168a40.12 40.12 0 00-40-40H104a40.12 40.12 0 00-40 40v160a40.12 40.12 0 0040 40h24" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32" /><rect x="128" y="240" width="256" height="208" rx="24.32" ry="24.32" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32" /><path d="M384 128v-24a40.12 40.12 0 00-40-40H168a40.12 40.12 0 00-40 40v24" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32" /><circle cx="392" cy="184" r="24" fill='currentColor' /></svg>
                                </span>
                                <span className="tm_btn_text">Print</span>
                            </button>

                        </div>
                        <div className="tm_invoice_wrap font_size">
                            <div className="tm_invoice tm_style2" id="tm_download_section">
                                <div className="tm_invoice_in">
                                    <div className="tm_invoice_content">
                                        <div className="tm_invoice_head tm_mb30">
                                            <div className="tm_invoice_left">
                                                <b className="tm_f30 tm_medium tm_primary_color">Invoice</b>
                                                <p className="tm_m0">Invoice Number - {getInvoice.id}</p>
                                            </div>
                                            <div className="tm_invoice_right tm_text_right">
                                                <b className="tm_f30 tm_medium tm_primary_color">Date</b>
                                                <p className="tm_m0">{currentDate}</p>
                                            </div>
                                        </div>
                                        <div className="tm_grid_row tm_col_2 tm_invoice_info_in tm_round_border tm_mb30">
                                            <div className="tm_border_right tm_border_none_sm">
                                                <b className="tm_primary_color">Guest Info</b>
                                                <p className="tm_m0">Name: {getInvoice.name} <br />
                                                    Profession: {getInvoice.profession} <br />
                                                    Address: {getInvoice.address}

                                                </p>
                                            </div>
                                            <div>
                                                <b className="tm_primary_color">Business Details:</b>
                                                <p className="tm_m0">
                                                    Company: {getInvoice.company} <br />
                                                    Mobile: {getInvoice.mobile}</p>
                                            </div>
                                        </div>
                                        <div className="  tm_mb25">
                                            {/* <div className="tm_invoice_info_left">
                                                <p className="tm_mb17">
                                                    <b className="tm_f18 tm_primary_color">SKY LAWN Hotel & Restaurant</b> <br />
                                                    R. K. Road. Islambag <br />  Rangpur<br />
                                                    <a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="a2cecdd5c7cecee2c5cfc3cbce8cc1cdcf">info@skylawnhotel</a> <br />
                                                    +88 01326085222
                                                </p>
                                            </div> */}
                                            <div className="">
                                                <div className="tm_grid_row tm_col_3 tm_col_2_sm tm_invoice_info_in  tm_round_border"
                                                >
                                                    <div>
                                                        <span>Check In:</span> <br />
                                                        <b className="tm_primary_color">{new Date(getInvoice?.checking_date_time).toLocaleString("en-GB", {
                                                            dateStyle: "medium",
                                                            timeStyle: "short",
                                                            hour12: true,
                                                        }).replace(/\b(am|pm)\b/gi, match => match.toUpperCase())}</b>
                                                    </div>
                                                    <div>
                                                        <span>Check Out:</span> <br />
                                                        <b className="tm_primary_color">
                                                            {new Date(getInvoice?.checkout_date_time).toLocaleString("en-GB", {
                                                                dateStyle: "medium",
                                                                timeStyle: "short",
                                                                hour12: true,
                                                            }).replace(/\b(am|pm)\b/gi, match => match.toUpperCase())}
                                                        </b>
                                                    </div>
                                                    <div>
                                                        <span>Total Day:</span> <br />
                                                        <b className="tm_primary_color">{getDay.days_difference}</b>
                                                    </div>
                                                    <div>
                                                        <span>Person:</span> <br />
                                                        <b className="tm_primary_color">{getInvoice.person}</b>
                                                    </div>
                                                    <div>
                                                        <span>Room No:</span> <br />
                                                        <b className="tm_primary_color">{getInvoice.room_number}</b>
                                                    </div>
                                                    <div>
                                                        <span>Room Type:</span> <br />
                                                        <b className="tm_primary_color">{getInvoice.room_category}</b>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tm_table tm_style1">
                                            <div className="tm_round_border">
                                                <div className="tm_table_responsive">
                                                    <table>
                                                        <thead>
                                                            <tr className='update-bg'>
                                                                <th className="tm_width_2 tm_semi_bold tm_primary_color">Room No</th>
                                                                <th className="tm_width_2 tm_semi_bold tm_primary_color">Room Name</th>
                                                                <th className="tm_width_2 tm_semi_bold tm_primary_color"> P.P.N</th>
                                                                <th className="tm_width_2 tm_semi_bold tm_primary_color">Day</th>
                                                                <th className="tm_width_2 tm_semi_bold tm_primary_color tm_text_right">R.Price</th>
                                                                <th className="tm_width_2 tm_semi_bold tm_primary_color tm_text_right">Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="tm_width_2">{getInvoice.room_number}</td>
                                                                <td className="tm_width_2"> {getDay.room?.room_name}</td>
                                                                <td className="tm_width_2"> {getDay.room?.price}</td>
                                                                <td className="tm_width_2"> {getDay.days_difference}</td>
                                                                {/* <td className="tm_width_2 tm_text_right"> ৳ {getInvoice.total_price}</td> */}
                                                                <td className="tm_width_2 tm_text_right"> ৳ {getDay.room?.price * getDay.days_difference}</td>
                                                                <td className="tm_width_2 tm_text_right">
                                                                    <input className='custom-input-data custom-input-width' value={totalPrice} type="number" onChange={(e) => setTotalPrice(e.target.value)} />
                                                                </td>
                                                            </tr>
                                                            {/*   <tr>
                                                                <td className="tm_width_2">{getInvoice.room_number}</td>
                                                                <td className="tm_width_2"> {getDay.room?.room_name}</td>
                                                                <td className="tm_width_2"> {getDay.room?.price}</td>
                                                                <td className="tm_width_2"> {getDay.days_difference}</td>
                                                                <td className="tm_width_2 tm_text_right"> ৳ {getInvoice.total_price}</td>
                                                                
                                                            </tr> */}
                                                            <tr id='resturant-cost'>
                                                                <td className="tm_width_3">Restaurant Cost (৳)</td>
                                                                <td contentEditable="true" className="tm_width_2"> </td>
                                                                <td className="tm_width_2" contentEditable="true"></td>
                                                                <td className="tm_width_2" contentEditable="true"></td>
                                                                <td className="tm_width_2" contentEditable="true"></td>
                                                                <td className="tm_width_2 tm_text_right inv-inp">
                                                                    <input className='custom-input-data custom-input-width' value={food} type="number" onChange={(e) => setFood(e.target.value)} />
                                                                </td>
                                                            </tr>
                                                            <tr id='other-cost'>
                                                                <td className="tm_width_2">Others Cost (৳)</td>
                                                                <td contentEditable="true" className="tm_width_2"> </td>
                                                                <td className="tm_width_2" contentEditable="true"> </td>
                                                                <td className="tm_width_2" contentEditable="true"> </td>
                                                                <td className="tm_width_2" contentEditable="true"> </td>
                                                                <td className="tm_width_2 tm_text_right inv-inp">
                                                                    <input className='custom-input-data custom-input-width' value={otheres} type="number" onChange={(e) => setOthers(e.target.value)} />
                                                                </td>
                                                            </tr>
                                                            <tr id='discount-cost'>
                                                                <td className="tm_width_2">Discount (৳)</td>
                                                                <td contentEditable="true" className="tm_width_2"> </td>
                                                                <td className="tm_width_2" contentEditable="true"> </td>
                                                                <td className="tm_width_2" contentEditable="true"> </td>
                                                                <td className="tm_width_2" contentEditable="true"> </td>
                                                                <td className="tm_width_2 tm_text_right inv-inp">
                                                                    <input className='custom-input-data custom-input-width'
                                                                        value={discount} type="number"
                                                                        onChange={(e) => setDiscount(e.target.value)} />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="tm_width_2">Advanced Payment (৳)</td>
                                                                <td contentEditable="true" className="tm_width_2"> </td>
                                                                <td className="tm_width_2" contentEditable="true"> </td>
                                                                <td className="tm_width_2" contentEditable="true"> </td>
                                                                <td className="tm_width_2" contentEditable="true"> </td>
                                                                <td className="tm_width_2 tm_text_right inv-inp">
                                                                    <input className='custom-input-data custom-input-width'
                                                                        value={getInvoice.advance ? getInvoice.advance : 0} type="number"
                                                                        readOnly
                                                                   /*  onChange={(e) => setAdvanced(e.target.value)} */ />
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
                                                            <tr className='tm_gray_bg'>
                                                                <td className="tm_width_3  tm_border_none tm_pt0">Sub Total</td>
                                                                <td
                                                                    id='subTotal'
                                                                    className="tm_width_3 tm_border_top_0 tm_bold tm_f18 tm_primary_color tm_text_right  tm_radius_0_6_6_0">
                                                                    ৳ {(
                                                                        (Number(food) || 0) +
                                                                        (Number(otheres) || 0) +
                                                                        (Number(getInvoice?.room_price) || 0) -
                                                                        (Number(discount) || 0) -
                                                                        (Number(getInvoice?.advance) || 0)
                                                                    )}
                                                                </td>

                                                            </tr>
                                                            <tr>
                                                                <td className="tm_width_3 tm_danger_color tm_border_none tm_pt0">Discount</td>
                                                                <td className="tm_width_3 tm_danger_color tm_text_right tm_border_none tm_pt0">{discount}</td>
                                                            </tr>
                                                            {/* <tr>
                                                                <td className="tm_width_3 tm_primary_color tm_border_none tm_pt0">Tax 5%</td>
                                                                <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">+ ৳50</td>
                                                            </tr> */}
                                                            <tr>
                                                                <td className="tm_width_3 tm_border_top_0 tm_bold tm_f18 tm_primary_color tm_gray_bg tm_radius_6_0_0_6">
                                                                    Grand Total
                                                                </td>
                                                                <td
                                                                    id='subTotal'
                                                                    className="tm_width_3 tm_border_top_0 tm_bold tm_f18 tm_primary_color tm_text_right tm_gray_bg tm_radius_0_6_6_0">
                                                                    ৳ {(
                                                                        (Number(food) || 0) +
                                                                        (Number(otheres) || 0) +
                                                                        (Number(getInvoice?.room_price) || 0) -
                                                                        (Number(discount) || 0) -
                                                                        (Number(getInvoice?.advance) || 0)
                                                                    )}
                                                                </td>

                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className=" flexdisplay  tm_type1">
                                                <div className="tm_left_footer ">
                                                    <div className="tm_sign tm_text_center">
                                                        <img src="assets/img/sign.svg" alt="" />
                                                        <p className="tm_m0 tm_ternary_color"></p>
                                                        <b className="tm_m0 tm_f16 tm_primary_color">Guest Signature</b>
                                                    </div>
                                                </div>
                                                <div className="tm_right_footer ">
                                                    <div className="tm_sign tm_text_center marginsdfk">
                                                        <img src="assets/img/sign.svg" alt="" />
                                                        <p className="tm_m0 tm_ternary_color"></p>
                                                        <b className="tm_m0 tm_f16 tm_primary_color ">Residence Manager</b>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="tm_note tm_text_center tm_font_style_normal">
                                            <hr className="tm_mb15" />
                                            <p className="tm_mb2"><b className="tm_primary_color">Terms & Conditions:</b></p>
                                            <p className="tm_m0">If you want to cancel the booking please inform us before 3 days, otherwise, you will not get any refund. <br />Invoice was created on a computer and is valid without the signature and seal.</p>
                                        </div> */}
                                    </div>
                                </div>
                            </div>

                            {/*  <div className="tm_invoice_btns tm_hide_print">
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
                            </div> */}
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Invoice;