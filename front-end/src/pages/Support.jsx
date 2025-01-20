import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";


const Support = () => {
  const { register, handleSubmit, reset, } = useForm();


  const onSubmit = (data) => {

    console.log(data);

    axios
        .post("http://192.168.0.115:8000/api/suport/add", {
            name: data.name,
            subject: data.subject,
            phone: data.phone,
            massage: data.massage,

        })
        .then(() => {
            toast.success("sopport added successfully!");
            reset()
        })
        .catch((error) => {
            console.log(error);
            toast.error("Failed to add sopport!");
        });
  }
  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Support / </span> Developers</h4>
        <div className="row">
          <div className="col-xxl">
            <div className="card mb-4">
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label" htmlFor="basic-default-name">Name</label>
                    <div className="col-sm-10">
                      <input
                        {...register("name", { required: true })}
                        name="name"
                        type="text"
                        className="form-control"
                        id="name-default-fullname"
                        placeholder="Name"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label" htmlFor="basic-default-name">Subject</label>
                    <div className="col-sm-10">
                      <input
                        {...register("subject", { required: true })}
                        name="subject"
                        type="text"
                        className="form-control"
                        id="name-default-fullname"
                        placeholder="Subject"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label" htmlFor="basic-default-phone">Phone No</label>
                    <div className="col-sm-10">
                      <input
                        {...register("phone", { required: true })}
                        name="phone"
                        type="number"
                        className="form-control"
                        id="name-default-fullname"
                        placeholder="Phon No."
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label" htmlFor="basic-default-message">Message</label>
                    <div className="col-sm-10">
                      <textarea
                        {...register("massage", { required: true })}
                        name="massage"
                        id="basic-icon-default-message"
                        className="form-control"
                        placeholder="Write Your Message"
                        aria-label="Hi, Do you have a moment to talk Joe?"
                        aria-describedby="basic-icon-default-message2"
                      ></textarea>
                    </div>
                  </div>
                  <div className="row justify-content-end">
                    <div className="col-sm-10">
                      <button type="submit" className="btn btn-primary">Send</button>
                    </div>
                  </div>
                </form>

                
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="content-backdrop fade"></div>
    </div>
  );
};

export default Support;