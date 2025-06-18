import React from 'react';

export default function RaffleWidget() {
  const handleBuyCredit = () => {
    alert('Stripe Checkout triggered (mock)');
  };

  return (
    <div className="card">
      <h2>Raffle & Credits</h2>
      <p>Tickets: 10 | Awards Won: 2</p>
      <button type="button" onClick={handleBuyCredit}>Buy Extra Credit</button>
    </div>
  );
}