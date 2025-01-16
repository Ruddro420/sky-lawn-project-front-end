

const CustomerRegister = () => {
    return (
        <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
            {/* <!-- Register Card --> */}
          <div className="card">
            <div className="card-body">
              {/* <!-- Logo --> */}
              
              {/* <!-- /Logo --> */}
              <h4 className="mb-2">Adventure starts here 🚀</h4>
              <p className="mb-4">Make your app management easy and fun!</p>

              <form id="formAuthentication" className="mb-3" action="index.html" method="POST">
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="text" className="form-control" id="email" name="email" placeholder="Enter your email" />
                </div>
                <div className="mb-3 form-password-toggle">
                  <label className="form-label" htmlFor="password">Password</label>
                  <div className="input-group input-group-merge">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                      aria-describedby="password"
                    />
                    <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="terms-conditions" name="terms" />
                    <label className="form-check-label" htmlFor="terms-conditions">
                      I agree to
                      <a href="javascript:void(0);">privacy policy & terms</a>
                    </label>
                  </div>
                </div>
                <button className="btn btn-primary d-grid w-100">Sign up</button>
              </form>

              <p className="text-center">
                <span>Already have an account?</span>
                <a href="auth-login-basic.html">
                  <span>Sign in instead</span>
                </a>
              </p>
            </div>
          </div>
          {/* <!-- Register Card --> */}
            </div>
            <div className="content-backdrop fade"></div>
        </div>
    );
};

export default CustomerRegister;