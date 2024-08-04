import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentCancel = () => {
  const location = useLocation();

  // Extract any relevant information from the URL if needed
  // const query = new URLSearchParams(location.search);
  // const session_id = query.get('session_id');

  return (
    <div>
      <h2>Payment Cancelled</h2>
      <p>Your payment was cancelled. Please try again.</p>
    </div>
  );
};

export default PaymentCancel;
