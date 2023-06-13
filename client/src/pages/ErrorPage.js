import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ErrorPage = () => {
  return (
    <StyledMain className="page-100">
      <section>
        <h1>404</h1>
        <h3>Sorry, page cannot be found.</h3>
        <Link to="/" className="btn">
          back home
        </Link>
      </section>
    </StyledMain>
  );
};

const StyledMain = styled.main`
  background: var(--clr-primary-10);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    text-transform: none;
    margin-bottom: 2rem;
  }
`;

export default ErrorPage;
