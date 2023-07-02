import React from "react";
import styled from "styled-components";

const ContactUs = () => {
  return (
    <StyledSection>
      <div className="section-center">
        <h3>Join Our Newsletter</h3>
        <div className="content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <form
            className="contact-form"
            action="https://formspree.io/f/exampleEndpoint"
            method="POST"
          >
            <input
              type="email"
              className="form-input"
              placeholder="Enter Email"
              name="_replyto"
            />
            <button type="submit" className="btn submit-btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  padding: 5rem 0;
  h3 {
    text-transform: none;
  }
  p {
    line-height: 2;
    max-width: 45em;
    color: var(--clr-grey-5);
  }
  .contact-form {
    width: 90vw;
    max-width: 500px;
    display: grid;
    grid-template-columns: 1fr auto;
  }

  .form-input,
  .submit-btn {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }
  .form-input {
    border-top-right-radius: 0rem;
    border-bottom-right-radius: 0rem;
  }
  .submit-btn {
    border: none;
    border-top-left-radius: 0rem;
    border-bottom-left-radius: 0rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
  }
  @media (min-width: 992px) {
    .content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 8rem;
      margin-top: 2rem;
    }
    p {
      margin-bottom: 0;
    }
  }
  @media (min-width: 1280px) {
    padding: 15rem 0;
  }
`;

export default ContactUs;
