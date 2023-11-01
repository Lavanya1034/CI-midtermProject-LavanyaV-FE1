import "./../../styles/SignUpPage.css";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { TbLogin } from "react-icons/tb";
import { Button } from "react-bootstrap";
import axios from "axios";
import { EndPoints } from "../../api/EndPoints";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const LoginPage = () => {
  const [initialValue, setInitialValues] = useState({
    username: "",
    password: "",
  });

  const validations = Yup.object().shape({
    username: Yup.string()
      .min(3, "min 3 characters long")
      .required("User Name should not be empty"),
    password: Yup.string()
      .min(5, "Min 6 characters")
      .max(12, "Max 12 characters")
      .required("Password is must"),
  });

  const nav = useNavigate();
  const [loginRequest, setLoginRequest] = useState({
    textMessage: "",
    alertClass: "",
  });

  const [showPass, setShowPass] = useState(false);
  function handleSubmit(values) {
    axios
      .post(EndPoints.LOGIN_URL, values)
      .then(
        (response) => {
          setLoginRequest({
            textMessage: "Login successfull",
            alertClass: "alert alert-success",
          });
          //storing user details in local storage
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", values.username);
          setTimeout(() => {
            nav("/");
          }, 1000);
        },

        (error) => {
          console.log(error.code);
          setLoginRequest({
            textMessage: error.response.data,
            alertClass: "alert alert-danger",
          });
        }
      )
      .catch((error) => {
        console.log(error);
        setLoginRequest({
          textMessage: error,
          alertClass: "alert alert-danger",
        });
      });
  }

  useEffect(() => {
    if (loginRequest.textMessage) {
      toast(`${loginRequest.textMessage}`, {
        position: "bottom-center",
        autoClose: 100,
        className: loginRequest.alertClass,
      });
    }
  }, [loginRequest.textMessage]);

  return (
    <div className="container loginPage">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="wrapper">
            <div className={loginRequest.alertClass} role="alert">
              {loginRequest.textMessage}
            </div>
            <ToastContainer />
            <h1 id="login-head">Login</h1>
            <Formik
              initialValues={initialValue}
              validationSchema={validations}
              onSubmit={handleSubmit}
              validateOnMount
            >
              {({ errors, touched, formik }) => (
                <Form>
                  <div className="form-group">
                    <Field
                      className={
                        errors.username && touched.username
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      name="username"
                      placeholder="User Name"
                    />
                    {errors.username && touched.username ? (
                      <div className="form-err">{errors.username}</div>
                    ) : null}
                  </div>

                  <div className="form-group">
                    <Field
                      className={
                        errors.password && touched.password
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      name="password"
                      type={showPass ? "text" : "password"}
                      placeholder="Password"
                    />
                    {errors.password && touched.password ? (
                      <div className="form-err">{errors.password}</div>
                    ) : null}
                    <div className="m-1" onClick={() => setShowPass(!showPass)}>
                      {!showPass ? (
                        <AiOutlineEyeInvisible className="eye-visible" />
                      ) : (
                        <AiOutlineEye className="eye-visible" />
                      )}
                    </div>
                  </div>
                  <p>
                    Don't have an account?Sign up <Link to="/signup">here</Link>
                  </p>
                  <Button
                    type="submit"
                    className={`d-flex justify-center items-center
                      ${
                        touched && !errors.username && !errors.password
                          ? "btn btn-success btn-block"
                          : "btn btn-primary btn-block"
                      }
                    `}
                  >
                    <TbLogin />
                    Login
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default LoginPage;
