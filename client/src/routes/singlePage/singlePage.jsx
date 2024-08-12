import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

import {loadStripe} from '@stripe/stripe-js';

function SinglePage() {
  const post = useLoaderData();
  console.log(post);
  const [saved, setSaved] = useState(post.isSaved);
  const [isBooked, setIsBooked] = useState(post.isBooked);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const makePayment = async () => {
    try {

    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

    const body = {
      post: post
    }

    const headers = {
      "Content-Type": "application/json"
    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/payment/create-checkout-session`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error('Failed to fetch checkout session');
    }

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id
    })

    if(result.error){
      console.log(result.error.message);
    }

  } catch (error) {
      console.error('Error during payment:', error);
    }
  }

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    // AFTER REACT 19 UPDATE TO USEOPTIMISTIK HOOK
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  // const handleChat = async () => {
  //   if (!currentUser) {
  //     navigate("/login");
  //   }
  //   try {
  //     await apiRequest.post("/api/chats", { receiverId: post.userId });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleChat = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    try {
      await apiRequest.post("/chats", { receiverId: post.userId });
      navigate('/profile')
    } catch (err) {
      console.log(err);
    }
  };

  let buttonColor = '';
  switch (isBooked) {
    case 'own':
      buttonColor = '#fece51';
      break;
    case 'other':
      buttonColor = 'darkgrey';
      break;
    default:
      buttonColor = 'white';
      break;
  }

  // console.log(isBooked);
  // console.log(post.userId);
  // console.log(currentUser.id);

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                {post.postDetail.utilities === "owner" ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {post.postDetail.pet === "allowed" ? (
                  <p>Pets Allowed</p>
                ) : (
                  <p>Pets not Allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>
                  {post.postDetail.school > 999
                    ? post.postDetail.school / 1000 + "km"
                    : post.postDetail.school + "m"}{" "}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button onClick={handleChat}>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>

            
            {currentUser && !(post.userId === currentUser.id) && <button onClick={makePayment}
            disabled={post.userId === currentUser.id || isBooked === 'own' || isBooked === 'other'}

            style={{ backgroundColor: buttonColor, color: 'black'}}
            >
              <img src="/chat.png" alt="" 
              />
              BookNow
            </button>
            }

            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "#fece51" : "white",
              }}
            >
              <img src="/save.png" alt="" />
              {saved ? "Place Saved" : "Save the Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
