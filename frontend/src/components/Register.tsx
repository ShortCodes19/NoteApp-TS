import React, { useState } from "react";
import { registerUserAPI } from "../services/AuthApi";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });

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
      const response = await registerUserAPI(inputs);
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }

    setInputs({ name: "", email: "", password: "" });
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="name"
          name="name"
          value={inputs.name}
          onChange={handleChange}
          placeholder="Name"
        />

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

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
