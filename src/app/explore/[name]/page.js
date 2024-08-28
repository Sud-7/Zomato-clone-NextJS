"use client";
import CustomerHeader from "@/app/_component/CustomerHeader";
import Footer from "@/app/_component/Footer";
import { useEffect, useState } from "react";

const Page = (props) => {
  //v33.1 created a page
  const name = props.params.name;
  //added decodeURI for removing "%20" from name
  const [restaurantDetails, setRestaurantDetails] = useState(); //v35.4 created state for placing content
  const [foodItems, setFoodItems] = useState([]);

  const [cartData, setCartData] = useState(); //v37.1 created State for cartData

  useEffect(() => {
    //v35.2 added loadrestaurantDetails
    loadRestaurantDetails();
  }, []);

  const loadRestaurantDetails = async () => {
    const id = props.searchParams.id; //v35.3 taking props from above
    // console.log(id)

    let response = await fetch("http://localhost:3000/api/customer/" + id);
    response = await response.json();
    if (response.success) {
      setRestaurantDetails(response.details);
      setFoodItems(response.foodItems);
    }
  };

  const addToCart = (item) => {
    // v37.3 here we get the item data
    setCartData(item);
  };

  //   <h4>Email:{restaurantDetails?.email}</h4>  added "?" as if there is something undefined it won/t show

  return (
    <div>
      <CustomerHeader cartData={cartData} />
      {/* v37.4 passed the cartdata to customer Header Component  */}
      <div className="restaurant-page-banner">
        <h1>{decodeURI(name)}</h1>
      </div>
      <div className="details-wrapper">
        <h4>Contact : {restaurantDetails?.contact}</h4>
        <h4>City:{restaurantDetails?.city}</h4>
        <h4>Address:{restaurantDetails?.address}</h4>
        <h4>Email:{restaurantDetails?.email}</h4>
      </div>
      <div className="food-list-wrapper">
        {foodItems.length > 0 ? (
          foodItems.map((item) => (
            <div className="list-item">
              <div>
                <img style={{ width: 100 }} src={item.img_path} />
              </div>

              <div>
                <div>{item.name}</div>
                <div>{item.price}</div>
                <div className="description">{item.description}</div>
                <button onClick={(item) => addToCart(item)}>Add to Cart</button>
                {/*v37.2 passing item in onclick so that it will have all the information */}
              </div>
            </div>
          ))
        ) : (
          <h1>No Food Items for this Restaurant</h1>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Page;
