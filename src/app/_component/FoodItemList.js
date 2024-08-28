import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FoodItemList = () => {
  const [foodItems, setFoodItems] = useState(); //for updating the Table
  const router = useRouter();

  useEffect(() => {
    loadFoodItems();
  }, []);

  const loadFoodItems = async () => {
    const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
    const resto_id = restaurantData._id; //to make our params dynamic we took out restaurant id from Local storage
    let response = await fetch(
      `http://localhost:3000/api/restaurant/foods/${resto_id}`
    );
    response = await response.json(); //data that has been fetched need to be converted in JSON format
    if (response.success) {
      console.log(response.result);
      setFoodItems(response.result);
    } else {
      alert("food item list not loading");
    }
  };
  const deleteFoodItem = async (id) => {
    let response = await fetch(
      "http://localhost:3000/api/restaurant/foods/" + id, //here we are sending id from as arguement
      {
        method: "delete",
      }
    );
    response = await response.json();
    if (response.success) {
      loadFoodItems();
    } else {
      alert("food item not deleted");
    }
  };

  return (
    <div>
      <h1>Food Items</h1>
      <table>
        <thead>
          <tr>
            <td>S.N</td>
            <td>Name</td>
            <td>Price</td>
            <td>Description</td>
            <td>Image</td>
            <td>Operations</td>
          </tr>
        </thead>
        <tbody>
          {foodItems && //don't why when withour this FoodItems i try to map throws error map is not a function but after putting this with AND operation it worked
            //Anil bhai just gave the answer, it is to check if data is present then only it reaches to map
            foodItems.map((item, key) => (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>
                  <img
                    width={150}
                    height={100}
                    alt="Food"
                    src={item.img_path}
                  />
                </td>
                <td>
                  {/* when we click it redirects to dynamic page, learn and understand how router.push takes page input */}
                  <button onClick={() => router.push(`dashboard/${item._id}`)}>
                    Edit
                  </button>
                  {/* picking this arguement from here taking advantage of map function */}
                  <button onClick={() => deleteFoodItem(item._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodItemList;
