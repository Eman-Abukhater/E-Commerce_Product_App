import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

// 1️⃣ Use your real test publishable key from Stripe
const stripePromise = loadStripe('pk_test_51RGkNCGgzLYNknzjMEkXF33RQn4qi45B3ONJSg8x8EHofNuffM7jlojgiImFCAoNoeZXLNUgZuue4OcdpKUnuSM9001Dokaqym');

const CheckoutButton = () => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    // 2️⃣ Call redirectToCheckout with your price ID
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: 'price_1RGmNlGgzLYNknzjhkOOK8l5', // ✅ This is your price ID
          quantity: 1,
        },
      ],
      mode: 'payment', // One-time payment
      successUrl: `${window.location.origin}/thank-you`, // After successful payment
      cancelUrl: `${window.location.origin}/cancel`,     // If the user cancels
    });

    if (error) {
      console.error("Stripe checkout error:", error);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Checkout
    </button>
  );
};

export default CheckoutButton;
