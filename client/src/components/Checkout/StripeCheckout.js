import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "..";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const StripeCheckout = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const body = JSON.stringify({ items: [{ id: "xl-tshirt" }] });
    axios
      .post("/create-payment-intent", body)
      .then((res) => {
        const { clientSecret } = res.data;
        console.log(clientSecret);
        setClientSecret(clientSecret);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <StyledSection>
      {clientSecret && (
        <Elements key={clientSecret} options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </StyledSection>
  );
};

const StyledSection = styled.section``;

export default StripeCheckout;
