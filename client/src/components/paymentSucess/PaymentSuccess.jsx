import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './paymentSuccess.scss';
import apiRequest from '../../lib/apiRequest';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [postId, setPostId] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const postId = query.get('post_id');
    setPostId(postId);

    console.log(postId);

    if(postId){
      const bookPost = async() => {
        try {
          const res = await apiRequest.post("/book/bookPost", { postId: postId });

          console.log(res);

        } catch (err) {
          console.log(err);
        }
      };

      bookPost()
    }else{
      console.error('Post ID not found in the URL');
    }

  }, [location.search]);

  

  const handleRedirect = () => {
    navigate(`/${postId}`);
  };

  return (
    <div className="payment-success">
      <div>
        <img src="/payment-success.png" className="tick-image" alt="Tick Mark" />
      </div>
      <div className="message">Payment Successful!</div>
      {postId && (
        <button className="button" onClick={handleRedirect}>
          Go to Booked Post
        </button>
      )}
    </div>
  );
};

export default PaymentSuccess;
