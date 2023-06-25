import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
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
        {/* Name */}
        <div className="form-row">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            value={values.name}
            name="name"
            onChange={handleChange}
            className="form-input"
          />
        </div>
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
