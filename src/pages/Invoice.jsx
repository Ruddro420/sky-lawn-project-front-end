import { useEffect, useState } from 'react';
import './Invoice.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
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
    const [totalPrice, setTotalPrice] = useState();
    const [nightPrice, setNightPrice] = useState(parseInt(
        getInvoice.person == 1
            ? getDay.room?.price - 500
            : getDay.room?.price + (getInvoice.person - 1) * 1000
    ));

    const navigate = useNavigate()


    // get current data
    function getDate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${date}/${month}/${year}`;
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
                setNightPrice(response.data.room.price)
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


    console.log(getInvoice);


    /* invoice download start */
    const handleDownloadPDF = () => {

        // get subTotal
        let totalAmount = document.getElementById('subTotal').innerText;
        let roomPrice = document.getElementById('roomPrice').innerText;
        let subData = document.getElementById('subTotalUpdate').innerText;
        let roomPriceUpdate = document.getElementById('roomPriceUpdate').innerText;

        console.log(subData);


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
                // room_price: getInvoice.room_price,
                room_price: nightPrice,
                duration: getDay.days_difference,
                total_price: roomPriceUpdate,
                advance: getInvoice.advance,
                discount: discount,
                final_amount: totalAmount,
                payment_status: 'Paid',
                payment_method: getInvoice.payment_method,
                room_name: getDay.room?.room_name,
                room_type_name: getInvoice.room_category,
                resturent_cost: food,
                other_cost: otheres,
                extra_5: subData,


            })
            .then(() => {
                toast.success("Checkout Successfully!");
                navigate('/main-booking-details')
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


        // // generate pdf
        // const element = document.getElementById("tm_download_section");

        // // Replace input fields with their values
        // const inputs = element.querySelectorAll("input");
        // inputs.forEach((input) => {
        //     const span = document.createElement("span");
        //     span.textContent = input.value || "0"; // Show zero if the field is empty
        //     span.style.fontFamily = "Arial, sans-serif"; // Ensure proper font rendering
        //     span.style.fontSize = getComputedStyle(input).fontSize;
        //     span.style.textAlign = getComputedStyle(input).textAlign;
        //     input.parentNode.replaceChild(span, input);
        // });

        // html2canvas(element, { scale: 2 }).then((canvas) => {
        //     const imgData = canvas.toDataURL("image/png");
        //     // const pdf = new jsPDF("p", "mm", "a4");
        //     const pdf = new jsPDF({
        //         orientation: "portrait",
        //         unit: "pt",  // Use points for accurate size
        //         format: [612, 792], // Letter size 
        //     });
        //     // const pdfWidth = pdf.internal.pageSize.getWidth();
        //     // const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        //     const pdfWidth = 612;
        //     const pdfHeight = 792;
        //     const marginTop = 70;
        //     pdf.addImage(imgData, "PNG", 0, marginTop, pdfWidth, pdfHeight - marginTop);
        //     pdf.save(`${getInvoice.invoice}-invoice.pdf`);

        //     // Revert spans back to input fields (optional, to restore the UI)
        //     inputs.forEach((input, index) => {
        //         const span = element.querySelectorAll("span")[index];
        //         input.parentNode.replaceChild(input, span);
        //     });
        // });
    };

    console.log(getDay)

    return (
        <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="">
                    <div className="">
                        <div className="tm_invoice_btns tm_hide_print">

                            <button onClick={handleDownloadPDF} className="tm_invoice_btn invoiceprintbtn tm_color1">
                                {/*  <span className="tm_btn_icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><path d="M384 368h24a40.12 40.12 0 0040-40V168a40.12 40.12 0 00-40-40H104a40.12 40.12 0 00-40 40v160a40.12 40.12 0 0040 40h24" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32" /><rect x="128" y="240" width="256" height="208" rx="24.32" ry="24.32" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32" /><path d="M384 128v-24a40.12 40.12 0 00-40-40H168a40.12 40.12 0 00-40 40v24" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32" /><circle cx="392" cy="184" r="24" fill='currentColor' /></svg>
                                </span> */}
                                <span className="btn btn-primary">Checkout Here</span>
                            </button>

                        </div>
                        <div className="tm_invoice_wrap font_size">
                            <div className="tm_invoice tm_style2" id="tm_download_section">
                                <div className="tm_invoice_in  ">
                                    <div className="tm_invoice_content">
                                        <div className="tm_invoice_head tm_mb30">
                                            <div className="tm_invoice_left">
                                                <b className="tm_f35 tm_medium tm_primary_color">Invoice</b>
                                                {/* <p className="tm_m0">Invoice Number - {getInvoice.id}</p> */}
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
                                                        <b className="tm_primary_color">{getDay.days_difference === 0 ? 1 : getDay.days_difference}</b>
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
                                            <div className="costom_bt costom_border_clr">
                                                <div className="tm_table_responsive">
                                                    <table>
                                                        <thead>
                                                            <tr className='update-bg'>
                                                                <th className="tm_width_2 tm_semi_bold tm_primary_color">Room No</th>
                                                                <th className="tm_width_4 tm_semi_bold tm_primary_color">Room Name</th>
                                                                <th className="tm_width_4 tm_semi_bold tm_primary_color"> Price Per Night</th>
                                                                <th className="tm_width_2 tm_semi_bold tm_primary_color">Day</th>
                                                                <th className="tm
                                                                _width_2 tm_semi_bold tm_primary_color tm_text_right"></th>
                                                                <th className="tm_width_2 tm_semi_bold tm_primary_color tm_text_right">Amount</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="tm_width_2">{getInvoice.room_number}</td>
                                                                <td className="tm_width_2"> {getDay.room?.room_name}</td>
                                                                <td id='roomPrice' className="tm_width_2">
                                                                    <input className='custom-input-data custom-input-width text-start'
                                                                        value={nightPrice}
                                                                        type="number" onChange={(e) => setNightPrice(e.target.value)} />
                                                                </td>
<<<<<<< HEAD
                                                                <td className="tm_width_2"> {getDay.days_difference}</td>
                                                                {/* <td className="tm_width_2 tm_text_right"> ৳ {getInvoice.total_price}</td> */}
                                                                <td className="tm_width_2 tm_text_right"> ৳ {(parseInt(
                                                                    getInvoice.person == 1
                                                                        ? getDay.room?.price - 500
                                                                        : getDay.room?.price + (getInvoice.person - 1) * 1000
                                                                )) * getDay.days_difference}</td>
=======
                                                                <td className="tm_width_2"> {getDay.days_difference === 0 ? 1 : getDay.days_difference}</td>
>>>>>>> 12743aaf4ad4f70670fa85361c85ecd7c2291487
                                                                <td className="tm_width_2 tm_text_right">
                                                                </td>
                                                                <td id='roomPriceUpdate' className="tm_width_2 tm_text_right"> ৳ {(nightPrice) * (getDay.days_difference === 0 ? 1 : getDay.days_difference)}</td>
                                                            </tr>
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

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="tm_invoice_footer  tm_mb15">
                                                <div className="tm_left_footer border-right">
                                                    <p className="tm_mb8   tm_gray_bg  p-1"><b className="tm_primary_color">Payment info:</b></p>
                                                    <p className="tm_m0 tm_gray_bg  p-1 mb-2"> Name : {getInvoice.name}</p>
                                                    <p className='tm_m0 tm_gray_bg p-1'>Payment Status - <b className=''>{getInvoice.payment_status}</b></p>
                                                </div>
                                                <div className="tm_right_footer ">
                                                    <table className="tm_mb15  ">
                                                        <tbody>
                                                            <tr className='tm_gray_bg  costom_border_clr  '>
                                                                <td className="tm_width_3 tm_border_top_0 tm_pt1 tm_primary_color ">Sub Total (৳)</td>
                                                                <td id='subTotalUpdate' className="tm_width_3 tm_border_top_0 tm_bold tm_f18 tm_primary_color tm_text_right tm_radius_0_6_6_0 ">
                                                                    {(
                                                                        (Number(food) || 0) +
                                                                        (Number(otheres) || 0) +
                                                                        (Number((nightPrice) * (getDay.days_difference === 0 ? 1 : getDay.days_difference)) || 0)
                                                                    )}
                                                                </td>
                                                            </tr>
                                                            <tr className='costom_border_clr'>
                                                                <td className="tm_width_3 tm_danger_color tm_f16 tm_pt1  ">Discount(৳)</td>
                                                                <td className="tm_width_3 tm_danger_color tm_f18 tm_text_right tm_border_none tm_pt1 border">{discount}</td>
                                                            </tr>
                                                            <tr className='costom_border_clr'>
                                                                <td className="tm_width_3 tm_primary_color tm_f16 tm_pt1  ">Advanced (৳)</td>
                                                                <td className="tm_width_3 tm_primary_color tm_f18 tm_text_right tm_border_none tm_pt1 border">
                                                                    {getInvoice.advance ? getInvoice.advance : 0}
                                                                </td>
                                                            </tr>
                                                            <tr className='costom_border_clr costom_border_bottom'>
                                                                <td className="tm_width_3 tm_border_top_0 tm_bold tm_f20 tm_primary_color  tm_radius_6_0_0_6    costom_border_bottom">
                                                                    Grand Total (৳)
                                                                </td>
                                                                <td id='subTotal' className="tm_width_3 tm_border_top_0 tm_bold tm_f20 tm_primary_color tm_text_right  tm_radius_0_6_6_0   costom_border_bottom">
                                                                    {(
                                                                        (Number(food) || 0) +
                                                                        (Number(otheres) || 0) +
                                                                        (Number((nightPrice) * (getDay.days_difference === 0 ? 1 : getDay.days_difference)) || 0) -
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Invoice;