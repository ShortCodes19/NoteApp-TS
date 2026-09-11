import React, { useState } from "react";
import { loginUserAPI } from "../services/AuthApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await loginUserAPI(inputs);
      console.log(response);
      navigate("/notes");
    } catch (error) {
      console.log(error);
    }
    setInputs({ email: "", password: "" });
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <input
          type="password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
          placeholder="Password"
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
