import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51RGkNCGgzLYNknzjMEkXF33RQn4qi45B3ONJSg8x8EHofNuffM7jlojgiImFCAoNoeZXLNUgZuue4OcdpKUnuSM9001Dokaqym"
);

const CheckoutButton = () => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: "price_1RGmNlGgzLYNknzjhkOOK8l5", 
          quantity: 1,
        },
      ],
      mode: "payment", 
      successUrl: `${window.location.origin}/thank-you`, 
      cancelUrl: `${window.location.origin}/cancel`, 
    });

    if (error) {
      console.error("Stripe checkout error:", error);
    }
  };

  return (
    <button
      className="block my-5 mx-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      onClick={handleCheckout}
    >
      Checkout
    </button>
  );
};

export default CheckoutButton;
