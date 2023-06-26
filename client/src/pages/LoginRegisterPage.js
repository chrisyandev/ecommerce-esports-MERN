import React, { useState } from "react";
import styled from "styled-components";
import { FormInput, FormAlert } from "../components";
import logo from "../assets/logo.svg";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
  showAlert: true,
};

const LoginRegisterPage = () => {
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    console.log(e.target);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <StyledSection className="page-100">
      <form className="form" onSubmit={onSubmit}>
        <img src={logo} alt="Esports Shop" className="logo" />
        <h3>Login</h3>
        {values.showAlert && <FormAlert />}
        {/* Name */}
        <FormInput
          type="text"
          name="name"
          value={values.name}
          handleChange={handleChange}
          labelText="Name"
        />
        {/* Email */}
        <FormInput
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
          labelText="Email"
        />
        {/* Password */}
        <FormInput
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
          labelText="Password"
        />
        <button type="submit" className="btn btn-block">
          Submit
        </button>
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
