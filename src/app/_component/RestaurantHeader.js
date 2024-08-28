"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const { default: Image } = require("next/image");
const { default: Link } = require("next/link");

const RestaurantHeader = () => {
  const [details, setDetails] = useState();
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    //here we checking if data is resent or not in local storage
    //pathname is an fucntion from next that checks the pathname
    const data = localStorage.getItem("restaurantUser");
    if (!data && pathName == "/restaurant/dashboard") {
      router.push("/restaurant");
    } else if (data && pathName == "/restaurant") {
      router.push("/restaurant/dashboard");
    }

    if (data) {
      setDetails(JSON.parse(data));
    }
  }, []);

  const logout = () => {
    //here we remove the data from local storage and redirects to main page
    localStorage.removeItem("restaurantUser");
    router.push("/restaurant");
  };

  return (
    <div className="header-wrapper">
      <div>
        <Image
          width={100}
          height={100}
          src={`/FoodDelivery.png`}
          alt="food-delivery-png"
        />
      </div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          {details && details.name ? ( //here we are checking if details are presesnt in local storage with a name then conditionally render
            //means there is a user logged in
            <>
              <Link href="/">Profile</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Link href="/">Login/SignUp</Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default RestaurantHeader;
//here we are checking if details are presesnt in local storage with a name then conditionally render
//means there is a user logged in
