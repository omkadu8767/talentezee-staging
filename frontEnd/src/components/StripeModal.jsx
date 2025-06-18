import React from 'react';
import './StripeModal.css';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51PezAzBjbOSBdmXqU7fM9K09B3pqvKmL6CVLnVk5LvVKNMQOqhqfxHj0PGBmSSMrpm44toO9tjolyIYEYxcj5rYG00tKVjaNAN'); 

const CheckoutForm = ({ userId, onClose, setCredits }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      alert(error.message);
    } else {
      try {
        const res = await fetch(`https://talentezee-server.onrender.com/api/payment/charge`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            paymentMethodId: paymentMethod.id,
            userId,
            amount: 100, // in cents (€1)
          }),
        });

        const data = await res.json();
        if (data.success) {
          alert('Payment successful!');
          setCredits(data.stat.credits);
          onClose(); 
        } else {
          alert('Payment failed.');
        }
      } catch (err) {
        console.error(err);
        alert('Payment error.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-form">
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay €1
      </button>
    </form>
  );
};

const StripeModal = ({ userId, onClose, setCredits}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Top Up Credits</h3>
        <Elements stripe={stripePromise}>
          <CheckoutForm userId={userId} onClose={onClose} setCredits={setCredits}/>
        </Elements>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default StripeModal;