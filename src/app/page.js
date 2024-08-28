"use client";
import { useRouter } from "next/navigation";
import CustomerHeader from "./_component/CustomerHeader";
import Footer from "./_component/Footer";
import { useEffect, useState } from "react";
import { BASE_URL } from "./_component/baseUrl";

export default function Home() {
  const [locations, setLocations] = useState([]); //v29
  const [selectedLocation, setSelectedLocation] = useState(""); //to select the value from to list and to populate the input field with it v29
  const [showLocation, setShowLocation] = useState(false); //for closing the list once onclick is triggered after selection v29

  const [restaurants, setRestaurants] = useState([]); // v31 for fetching restautaranrts

  const router = useRouter(); //v33 created explore/dynamic page when onclick triggers over Restaurant click

  useEffect(() => {
    loadLocations();
    loadRestaurants();
  }, []);

  const loadLocations = async () => {
    //v29
    let response = await fetch(BASE_URL + "api/customer/locations");
    response = await response.json();
    if (response.success) {
      setLocations(response.result);
    }
  };

  const loadRestaurants = async (params) => {
    //v32.1 taking params for filtering location and restaurants
    //fetching data from restaurants v31
    let url = BASE_URL + "/api/customer";
    if (params?.location) {
      //32.4 "?" as even if there is nothing it won't throw error
      url = url + "?location=" + params.location;
    } else if (params?.restaurant) {
      url = url + "?restaurant=" + params.restaurant; //32.6
    }
    let response = await fetch(url);
    response = await response.json();
    if (response.success) {
      setRestaurants(response.result);
    }
  };
  //console.log(restaurants); //checking if its fetching the data v31

  const handleListItem = (item) => {
    setSelectedLocation(item);
    setShowLocation(false);
    loadRestaurants({ location: item }); //v32.3 here we are setting the location when onclick triggers
  };

  return (
    <main>
      <CustomerHeader />
      <div className="main-page-banner">
        <h1>Food Delivery App</h1>
        <div className="input-wrapper">
          <input
            type="text"
            className="select-input"
            placeholder="Select Place"
            value={selectedLocation}
            onClick={() => setShowLocation(true)} //once click on the input field it will open the list v29
          />
          <ul className="location-list">
            {showLocation &&
              locations.map(
                (
                  item //use AND to only show when showlocation is true v29
                ) => <li onClick={() => handleListItem(item)}>{item}</li> //v32.2 now when we select any location
              )}
          </ul>
          <input
            type="text"
            className="search-input"
            placeholder="Enter food or restaurant name"
            onChange={(e) => loadRestaurants({ restaurant: e.target.value })} //v32.5 we passed arguement with restaurat details to the fucntion
          />
        </div>
      </div>
      <div className="restaurant-list-container">
        {restaurants.map((item) => (
          <div
            onClick={() =>
              router.push("explore/" + item.name + "?id=" + item._id)
            } //v33.3 when click redirects to its page //v35.1 added ID as well
            className="restaurant-wrapper"
          >
            <div className="restaurant-container">
              <h3>{item.name}</h3>
              <h5>Contact: {item.contact}</h5>
            </div>
            <div className="address-wrapper">
              <div>{item.city}</div>
              <div className="address">
                {item.address}, Email: {item.email}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </main>
  );
}
