
const AccountSettings = () => {
  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">

        <h4 className="fw-bold py-3 mb-4 ms-2"><span className="text-muted fw-light">Account Settings /</span> Account</h4>

        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4">
              <h5 className="card-header">Profile Details</h5>
              {/* <!-- Account --> */}
              <div className="card-body">
                <div className="d-flex align-items-start align-items-sm-center gap-4">
                  <img
                    src="../assets/img/avatars/1.png"
                    alt="user-avatar"
                    className="d-block rounded"
                    height="100"
                    width="100"
                    id="uploadedAvatar"
                  />
                </div>
              </div>
              <hr className="my-0" />
              <div className="card-body">
                <form id="formAccountSettings" method="POST" onSubmit="return false">
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="firstName" className="form-label">User Name</label>
                      <input
                        className="form-control"
                        type="text"
                        id="firstName"
                        name="firstName"
                        value="John"
                        autoFocus
                      />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="lastName" className="form-label">Email</label>
                      <input className="form-control" type="text" name="lastName" id="lastName" value="Doe" />
                    </div>
                    <div className="mb-3 col-md-12">
                      <label htmlFor="organization" className="form-label">Password</label>
                      <input
                        type="text"
                        className="form-control"
                        id="organization"
                        name="organization"
                        value="ThemeSelection"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <button type="submit" className="btn btn-primary me-2">Save changes</button>
                    <button type="reset" className="btn btn-outline-secondary">Cancel</button>
                  </div>
                </form>
              </div>
              {/* <!-- /Account --> */}
            </div>
            <div className="card">
              <h5 className="card-header">Delete Account</h5>
              <div className="card-body">
                <div className="mb-3 col-12 mb-0">
                  <div className="alert alert-warning">
                    <h6 className="alert-heading fw-bold mb-1">Are you sure you want to delete your account?</h6>
                    <p className="mb-0">Once you delete your account, there is no going back. Please be certain.</p>
                  </div>
                </div>
                <form id="formAccountDeactivation" onSubmit="return false">
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="accountActivation"
                      id="accountActivation"
                    />
                    <label className="form-check-label" htmlFor="accountActivation"
                    >I confirm my account deactivation</label
                    >
                  </div>
                  <button type="submit" className="btn btn-danger deactivate-account">Deactivate Account</button>
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

export default AccountSettings;