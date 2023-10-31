import { useFormik } from "formik";
import * as Yup from "yup";
import "./../../styles/SignUpPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { Button } from "react-bootstrap";
import { MdOutlineAssignmentInd } from "react-icons/md";
import axios from "axios";
import { EndPoints } from "../../api/EndPoints";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const SignUpPage = () => {
  const nav = useNavigate();

  //to set password visibility
  const [showPass, setShowPass] = useState(false);
  const [showConPass, setShowConPass] = useState(false);

  const [requestResponse, setRequestResponse] = useState({
    textMessage: "",
    alertClass: "",
  });
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    //mobile is required when using swaggUI for register
    // mobile: "",
    email: "",
    password: "",
    conPassword: "",
  });

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First Name is must")
      .min(3, "min 3 characters long")
      .max(12, "max 12 characters long")
      .matches(/^[a-zA-Z0-9]+$/, "Invalid name format"),
    lastName: Yup.string()
      .required("Last Name is must")
      .min(1, "min 1 character long")
      .max(12, "max 12 characters long")
      .matches(/^[a-zA-Z0-9]+$/, "Invalid name format"),
    //mobile is required for swaggUI registering
    // mobile: Yup.string().required("Mobile is required"),
    email: Yup.string().required("Email is must").email("Invalid email"),
    password: Yup.string()
      .required("password is must")
      .min(6, "min 6 characters long"),
    conPassword: Yup.string()
      .required("Confirm password is must")
      .oneOf(
        [Yup.ref("password"), null],
        "Confirm passsword should match password"
      ),
  });

  const onSubmit = (values) => {
    console.log(values);
    axios
      .post(EndPoints.REGISTER_URL, values)
      .then(
        (response) => {
          console.log(response);
          setRequestResponse({
            textMessage: "Sign up successful",
            alertClass: "alert alert-success",
          });
          setTimeout(() => {
            nav("/login");
          }, 2000);
        },
        (error) => {
          setRequestResponse({
            textMessage: "Not successful- Please Try again!!!",
            alertClass: "alert alert-danger",
          });
          console.log(requestResponse.textMessage);
        }
      )
      .catch((error) => {
        console.log(error.code);
        setRequestResponse({
          textMessage: error,
          alertClass: "alert alert-danger",
        });
      });
    console.log(requestResponse.textMessage);
  };

  useEffect(() => {
    if (requestResponse.textMessage) {
      toast(`${requestResponse.textMessage}`, {
        position: "bottom-center",
        autoClose: 100,
        className: requestResponse.alertClass,
      });
    }
  }, [requestResponse.textMessage]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: true,
    onSubmit,
  });
  return (
    <div className="container signUpPage">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="wrapper">
            <div role="alert" className={requestResponse.alertClass}>
              <ToastContainer />
              {requestResponse.textMessage}
            </div>
            <h2 className="form-signup">Sign Up</h2>

            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formik.values.firstName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={
                    formik.errors.firstName && formik.touched.firstName
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
                {formik.errors.firstName && formik.touched.firstName ? (
                  <small className="text-danger">
                    {formik.errors.firstName}
                  </small>
                ) : null}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formik.values.lastName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={
                    formik.errors.lastName && formik.touched.lastName
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
                {formik.errors.lastName && formik.touched.lastName ? (
                  <small className="text-danger">
                    {formik.errors.lastName}
                  </small>
                ) : null}
              </div>
              {/* mobile number is required if we are using SwaggUI -API for signup */}
              {/* <div className="form-group">
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="number"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formik.values.mobile}
                  className={
                    formik.errors.mobile && formik.touched.mobile
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
                {formik.errors.mobile && formik.touched.mobile ? (
                <small className="text-danger">{formik.errors.mobile}</small>
              ) : null}
              </div> */}

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={
                    formik.errors.email && formik.touched.email
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
                {formik.errors.email && formik.touched.email ? (
                  <small className="text-danger">{formik.errors.email}</small>
                ) : null}
              </div>
              <div className="form-group">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={
                    formik.errors.password && formik.touched.password
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
                <div className="m-1" onClick={() => setShowPass(!showPass)}>
                  {!showPass ? (
                    <AiOutlineEyeInvisible className="eye-visible" />
                  ) : (
                    <AiOutlineEye className="eye-visible" />
                  )}
                </div>
                {formik.errors.password && formik.touched.password ? (
                  <small className="text-danger">
                    {formik.errors.password}
                  </small>
                ) : null}
              </div>
              <div className="form-group">
                <input
                  type={showConPass ? "text" : "password"}
                  placeholder="Password Confirm"
                  name="conPassword"
                  value={formik.values.conPassword}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={
                    formik.errors.conPassword && formik.touched.conPassword
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
                <div className="m-1" onClick={() => setShowConPass(!showConPass)}>
                  {!showConPass ? (
                    <AiOutlineEyeInvisible className="eye-visible" />
                  ) : (
                    <AiOutlineEye className="eye-visible" />
                  )}
                </div>
                {formik.errors.conPassword && formik.touched.conPassword ? (
                  <small className="text-danger">
                    {formik.errors.conPassword}
                  </small>
                ) : null}
              </div>

              <p>
                Already have an account?Login
                <Link to="/login"> here.</Link>
              </p>
              <Button
                type="submit"
                className={`d-flex justify-center items-center gap-2
                  ${formik.isValid
                    ? "btn btn-success btn-block"
                    : "btn btn-primary btn-block"}`
                }
              >
                <MdOutlineAssignmentInd />
                Sign Up
              </Button>
            </form>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default SignUpPage;
