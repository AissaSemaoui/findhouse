import { useState } from "react";
import { signInWithCredentials, signInWithGoogle } from "../../utils/auth";
import { useEffect } from "react";

const Form = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const onSuccessSignIn = (res) => {
    if (!res.ok) setError("Email or Password is wrong, Please try again!");
  };
  const onFailedSignIn = (err) =>
    setError("Something wrong, Please try again!");

  const handleSignIn = (event) => {
    event.preventDefault();
    signInWithCredentials({
      email: userInfo.email,
      password: userInfo.password,
    })
      .then(onSuccessSignIn)
      .catch(onFailedSignIn);
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle("google", { callbackUrl: "/" })
      .then(onSuccessSignIn)
      .catch(onFailedSignIn);
  };

  useEffect(() => setError(""), [userInfo]);

  return (
    <div className="login_form">
      <form onSubmit={handleSignIn}>
        <div className="heading text-center">
          <h3>Login to your account</h3>
        </div>
        {/* End heading */}

        <div className="row mt25">
          <div className="col-lg-12">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn btn-googl w-100"
            >
              <i className="fa fa-google float-start mt5"></i> Login with Google
            </button>
          </div>
        </div>
        {/* End .row */}

        <hr />

        <div className="input-group mb-2 mr-sm-2">
          <input
            type="text"
            className="form-control"
            id="inlineFormInputGroupUsername2"
            placeholder="User Name Or Email"
            value={userInfo.email}
            onChange={({ target }) =>
              setUserInfo((prev) => ({ ...prev, email: target.value }))
            }
          />
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="flaticon-user"></i>
            </div>
          </div>
        </div>
        {/* End input-group */}

        <div className="input-group form-group">
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={userInfo.password}
            onChange={({ target }) =>
              setUserInfo((prev) => ({ ...prev, password: target.value }))
            }
          />
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="flaticon-password"></i>
            </div>
          </div>
        </div>
        {/* End input-group */}
        <p className="text-danger fs-6">{error}</p>

        <button type="submit" className="btn btn-log w-100 btn-thm">
          Log In
        </button>
        {/* End submit button */}
      </form>
    </div>
  );
};

export default Form;
