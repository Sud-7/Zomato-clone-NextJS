"use client";
import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

const CustomerHeader = (props) => {
  // console.log(props)
  //here 37.5 received props here

  // const userStorage =
  //   localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  // const cartStorage =
  //   localStorage.getItem("cart") && JSON.parse(localStorage.getItem("cart")); //37.9 created this so that upon refreshing cart gets its values from local storage

  // const [user, setUser] = useState(userStorage ? userStorage : undefined);

  // const [cartNumber, setCartNumber] = useState(cartStorage?.length); //v37.6 creted state here
  // const [cartItem, setCartItem] = useState(cartStorage); //37.10 added cartStorage inside cart item and added "?" if the value is none/undefined
  // const router = useRouter();
  // console.log(userStorage);

  // useEffect(() => {
  //   if (props.cartData) {
  //     //37.7 made if statement as when we are calling while mounting it shows 1 item in cart but for that to not happen we made the if statement -> means it if there is item in cart then goes to if side
  //     console.log(props);
  //     if (cartNumber) { //37.11 when there are already values in cart number
  //       if (cartItem[0].resto_id != props.cartData.resto_id) {
  //         localStorage.removeItem("cart");
  //         setCartNumber(1);
  //         setCartItem([props.cartData]); //37.9 here we have made it an array coz cartData is consist of many things
  //         localStorage.setItem("cart", JSON.stringify([props.cartData])); //for persisting the cart value upon refreshing
  //       } else {
  //         let localCartItem = cartItem;
  //         localCartItem.push(JSON.parse(JSON.stringify(props.cartData)));
  //         setCartItem(localCartItem);
  //         setCartNumber(cartNumber + 1);
  //         localStorage.setItem("cart", JSON.stringify(localCartItem));
  //       }
  //     } else {
  //       setCartNumber(1);
  //       setCartItem([props.cartData]);
  //       localStorage.setItem("cart", JSON.stringify([props.cartData]));
  //     }
  //   }
  // }, [props.cartData]); // 37.8 passed dependency as this is what we are receiving

  // useEffect(() => {
  //   if (props.removeCartData) {
  //     let localCartItem = cartItem.filter((item) => {
  //       return item._id != props.removeCartData;
  //     });
  //     setCartItem(localCartItem);
  //     setCartNumber(cartNumber - 1);
  //     localStorage.setItem("cart", JSON.stringify(localCartItem));
  //     if (localCartItem.length == 0) {
  //       localStorage.removeItem("cart");
  //     }
  //   }
  // }, [props.removeCartData]);

  // useEffect(() => {
  //   if (props.removeCartData) {
  //     setCartItem([]);
  //     setCartNumber(0);
  //     localStorage.removeItem("cart");
  //   }
  // }, [props.removeCartData]);

  // const logout = () => {
  //   localStorage.removeItem("user");
  //   router.push("/user-auth");
  // };

  return (
    <div className="header-wrapper">
      <div className="logo">
        <img style={{ width: 100 }} src={`/FoodDelivery.png`} />
      </div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>

        <li>
          <Link href="/">Cart(0) </Link>
        </li>
        <li>
          <Link href="/restaurant">Add Restaurant</Link>
        </li>
        <li>
          <Link href="/deliverypartner">Delivery Partner</Link>
        </li>
      </ul>
    </div>
  );
};

export default CustomerHeader;
