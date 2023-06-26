import React, { useState } from "react";
import styled from "styled-components";
import { FormInput, FormAlert } from "../components";
import { useUserContext } from "../contexts/user-context";
import { useVisibilityContext } from "../contexts/visibility-context";
import logo from "../assets/logo.svg";
import { alertTypes } from "../utils/constants";

const initialState = {
  name: "",
  email: "",
  password: "",
  isLogin: true,
};

const LoginRegisterPage = () => {
  const [form, setForm] = useState(initialState);
  const { user, userLoading, registerUser, loginUser } = useUserContext();
  const { isAlertShown, alertType, alertText, showAlert, hideAlert } =
    useVisibilityContext();

  const toggleLoginRegister = () => {
    hideAlert();
    setForm((prev) => ({ ...prev, isLogin: !form.isLogin }));
  };

  const handleFormInputChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isLogin } = form;

    if (!email || !password || (!isLogin && !name)) {
      showAlert(alertTypes.ERROR, "Please fill out all fields");
      return;
    }

    const userData = { name, email, password };

    if (isLogin) {
      loginUser(userData);
    } else {
      registerUser(userData);
    }
  };

  return (
    <StyledSection className="page-100">
      <form className="form" onSubmit={handleFormSubmit}>
        <img src={logo} alt="Esports Shop" className="logo" />
        <h3>{form.isLogin ? "Login" : "Register"}</h3>
        {isAlertShown && <FormAlert type={alertType} text={alertText} />}
        {/* Name */}
        {!form.isLogin && (
          <FormInput
            type="text"
            name="name"
            value={form.name}
            handleChange={handleFormInputChange}
            labelText="Name"
            onClick={hideAlert}
          />
        )}
        {/* Email */}
        <FormInput
          type="email"
          name="email"
          value={form.email}
          handleChange={handleFormInputChange}
          labelText="Email"
          onClick={hideAlert}
        />
        {/* Password */}
        <FormInput
          type="password"
          name="password"
          value={form.password}
          handleChange={handleFormInputChange}
          labelText="Password"
          onClick={hideAlert}
        />
        <button type="submit" className="btn btn-block" disabled={userLoading}>
          Submit
        </button>
        <p>
          {form.isLogin ? "Not a member?" : "Already a member?"}
          &nbsp;
          <button
            type="button"
            onClick={toggleLoginRegister}
            className="member-btn"
          >
            {form.isLogin ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  display: grid;
  align-items: center;

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--clr-primary-5);
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    letter-spacing: 1px;
  }
`;

export default LoginRegisterPage;
