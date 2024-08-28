"use client";

import RestaurantHeader from "@/app/_component/RestaurantHeader";
import "../style.css";
import AddFoodItem from "@/app/_component/AddFoodItem";
import { useState } from "react";
import FoodItemList from "@/app/_component/FoodItemList";

const Page = () => {
  const [addfood, setAddfood] = useState(false);

  return (
    <div>
      <RestaurantHeader />
      <button onClick={() => setAddfood(true)}>Add Food</button>
      <button onClick={() => setAddfood(false)}>dashboard</button>
      {addfood ? <AddFoodItem setAddfood={setAddfood} /> : <FoodItemList />}
      {/* v21 send state as props for switching them there once food is added */}
    </div>
  );
};
export default Page;
