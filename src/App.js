import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "./App.css";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("");
const arriba =  pk_test_51Hb81WHL9bcHQvqVg55BtM5whikx0wW7Gh4uHeVdPy4wEOAkqs4VG3ssO716YQygSLsJYWHsP646aH5MqgaSMYPE00SzSoXD0B;

const ProductDisplay = ({ handleClick }) => (
  <section>
    <div className="product">
      <img
        src="https://images-ext-1.discordapp.net/external/0w6AAiCZ5V_mQaYvdne3Z5wRlHz12Mcx_QHo6cvkU5I/https/lh4.googleusercontent.com/CwDWSa_sOqFX2pzEheA6meBM_b-HSXLtNCu5QWnsde8J8ScwcPLZ0DIJ7wW0PyunYP6V4bGZina36hg%3Dw1200-h630-p?width=1080&height=567"
        
        
      />
      <div className="description">
        <h3>Subscipcion Cuidamed</h3>
        <h5>$1200.00</h5>
      </div>
    </div>
    <button id="checkout-button" role="link" onClick={handleClick}>
      Checkout
    </button>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Orden Aceptada! Reciviras un email de confirmacion.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceleda."
      );
    }
  }, []);

  const handleClick = async (event) => {
    const stripe = await stripePromise;

    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });

    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay handleClick={handleClick} />
  );
}
