import { useState } from "react";
import { signInWithCredentials, signInWithGoogle } from "../../utils/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { adminSchema } from "../../validations/user.validation";

const Form = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const route = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(adminSchema),
  });

  const onSuccessSignIn = (res) => {
    if (res.ok) route.replace("/");
    else setError("Email or Password is wrong, Please try again!");
  };
  const onFailedSignIn = (err) =>
    setError("Something wrong, Please try again!");

  const handleSignIn = (userInfo) => {
    signInWithCredentials({
      email: userInfo.email,
      password: userInfo.password,
    })
      .then(onSuccessSignIn)
      .catch(onFailedSignIn);
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle("google", { callbackUrl: "/" }).catch(onFailedSignIn);
  };

  useEffect(() => setError(""), [userInfo]);

  return (
    <div className="login_form">
      <form onSubmit={handleSubmit(handleSignIn)}>
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

        <div className="input-group mb-3 mr-sm-2">
          <input
            type="text"
            className={`form-control ${errors?.email ? "is-invalid" : ""}`}
            id="inlineFormInputGroupUsername2"
            placeholder="User Name Or Email"
            {...register("email")}
          />
          {errors?.email && (
            <div className="invalid-feedback">{errors?.email.message}</div>
          )}
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="flaticon-user"></i>
            </div>
          </div>
        </div>
        {/* End input-group */}

        <div className="input-group form-group mb-3">
          <input
            type="password"
            className={`form-control ${errors?.password ? "is-invalid" : ""}`}
            id="exampleInputPassword1"
            placeholder="Password"
            {...register("password")}
          />
          {errors?.password && (
            <div className="invalid-feedback">{errors?.password?.message}</div>
          )}
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
