import { useRouter } from "next/navigation";
import { useState } from "react";
import { BASE_URL } from "./baseUrl";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);

  let router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      //check if there is no email or password throw an error
      setError(true);
      return false;
    } else {
      setError(false);
    }

    let response = await fetch(BASE_URL + "/api/restaurant", {
      //throwing details to API for POST
      method: "POST",
      body: JSON.stringify({ email, password, login: true }), //here we have given login flag for API condition
    });

    response = await response.json();
    if (response.success) {
      // console.log(response);
      const { result } = response; //storing result into variable
      delete result.password; //delete that password from here
      localStorage.setItem("restaurantUser", JSON.stringify(result)); //added into local storage
      router.push("/restaurant/dashboard"); //redirected to the dashboard page
    } else {
      alert("Login failed");
    }
  };

  return (
    <>
      <h3>Login</h3>
      <div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error &&
            !email && ( //if there is error and no email throw error
              <span className="input-error">Please enter valid email </span>
            )}
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && !password && (
            <span className="input-error">Please enter valid password </span>
          )}
        </div>
        <div className="input-wrapper">
          <button onClick={handleLogin} className="button">
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
