"use client";
import { BASE_URL } from "@/app/_component/baseUrl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// same skeleteon as ADD FOOD ITEM.JS v22
const EditFoodItems = (props) => {
  //props is used to take out the params v22
  console.log(props.params.id);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    handleLoadFoodItem(); //useEffect is used when the sites get mount, it will call it
  }, []);

  const handleLoadFoodItem = async () => {
    let response = await fetch(
      BASE_URL + "/api/restaurant/foods/edit/" + props.params.id
    );
    response = await response.json();
    if (response.success) {
      console.log(response.result);
      setName(response.result.name); // these below fields are populating the fields
      setPrice(response.result.price);
      setPath(response.result.img_path);
      setDescription(response.result.description);
    }
  };

  const handleEditFoodItem = async () => {
    //this is hitting our api/res../foods/edit/[dynamic id]
    console.log(name, price, path, description);
    if (!name || !path || !price || !description) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    let response = await fetch(
      BASE_URL + "api/restaurant/foods/edit/" + props.params.id, //created fucntion to send PUT request to api
      {
        method: "PUT",
        body: JSON.stringify({ name, price, img_path: path, description }),
      }
    );
    response = await response.json();
    if (response.success) {
      router.push("../dashboard");
    } else {
      alert("data is not updated please try again");
    }
  };

  return (
    <div className="container">
      <h1> Update Food Item</h1>
      <div className="input-wrapper">
        <input
          type="text"
          className="input-field"
          placeholder="Enter food name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && !name && (
          <span className="input-error">Please enter valid name</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          className="input-field"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && !price && (
          <span className="input-error">Please enter valid price</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          className="input-field"
          placeholder="Enter image path"
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
        {error && !path && (
          <span className="input-error">Please enter valid path</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          className="input-field"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {error && !description && (
          <span className="input-error">Please enter valid description</span>
        )}
      </div>
      <div className="input-wrapper">
        <button className="button" onClick={handleEditFoodItem}>
          Update Food Item
        </button>
      </div>
      <div className="input-wrapper">
        <button className="button" onClick={() => router.push("../dashboard")}>
          Back to Food Item list
        </button>
      </div>
    </div>
  );
};

export default EditFoodItems;
