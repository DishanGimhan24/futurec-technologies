import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();
  
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .test('unique-name', 'Name already exists', (value) => {
        if (!value) return false; 
        const storedData = Object.keys(localStorage).map((key) => JSON.parse(localStorage.getItem(key)));
        return !storedData.some((formData) => formData.name === value); // Check if name exists
      }),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .test('unique-email', 'Email already exists', (value) => {
        if (!value) return false; 
         const storedData = Object.keys(localStorage).map((key) => JSON.parse(localStorage.getItem(key)));
        return !storedData.some((formData) => formData.email === value); 
      }),
    password: Yup.string()
      .min(8, 'Password must be 8 characters long')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[^\w]/, 'Password requires a symbol')
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  

  const handleSubmit = (values) => {
    localStorage.setItem("formData", JSON.stringify(values));
    console.log("Form submitted:", values);
    alert("Registration successful!");
    navigate("/");
 
  };

  return (
    <div>
      <section className="signup">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title">Sign up</h2>
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                agreeTerm: false,
              }}
              validationSchema={SignupSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="register-form">
                  <div className="form-group">
                    <label htmlFor="name">
                      <i className="zmdi zmdi-account material-icons-name"></i>
                    </label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      className="form-control"
                    />
                    <ErrorMessage name="name" component="div" className="error" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      <i className="zmdi zmdi-email"></i>
                    </label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      className="form-control"
                    />
                    <ErrorMessage name="email" component="div" className="error" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">
                      <i className="zmdi zmdi-lock"></i>
                    </label>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="form-control"
                    />
                    <ErrorMessage name="password" component="div" className="error" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">
                      <i className="zmdi zmdi-lock-outline"></i>
                    </label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="Repeat your password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      type="checkbox"
                      name="agreeTerm"
                      id="agree-term"
                      className="agree-term"
                    />
                    <label htmlFor="agree-term" className="label-agree-term">
                      I agree to the terms and conditions
                    </label>
                    <ErrorMessage name="agreeTerm" component="div" className="error" />
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      Register
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="signup-img">
            <figure>
              <img
                src="https://static.vecteezy.com/system/resources/previews/003/689/228/non_2x/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg"
                alt="sign up"
                style={{ height: "400px", width: "400px" }}
              />
            </figure>
            <a href="/" className="signup-image-link">
              <h4>I already have an Account</h4>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
