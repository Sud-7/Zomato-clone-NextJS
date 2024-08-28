"use client";
import { useState } from "react";
import Login from "../_component/RestaurantLogin";
import Signup from "../_component/RestaurantSignup";
import RestaurantHeader from "../_component/RestaurantHeader";
import "./style.css";

import Footer from "../_component/Footer";

const Page = () => {
  const [login, setLogin] = useState(true);
  return (
    <>
      <div className="container">
        <RestaurantHeader />

        <h1>Restaurant Login/Signup Page</h1>
        {login ? <Login /> : <Signup />}

        <div>
          <button onClick={() => setLogin(!login)} className="button-link">
            {login
              ? "Don't have an Account? Signup"
              : "Already have an Account? Login "}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
