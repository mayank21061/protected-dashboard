import React, { useState } from "react";
import { useAppDispatch } from "../Redux/hooks";
import axios from "axios";
import { setToken } from "../Redux/features/AuthSlice";
import { Link, useNavigate } from "react-router-dom";

interface AuthFormProps {
  title: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ title }) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      let url =
        title === "Sign Up"
          ? "https://reqres.in/api/register"
          : "https://reqres.in/api/login";
      const response = await axios.post(url, {
        email,
        password,
      });
      const { token } = response.data;
      dispatch(setToken(token));
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-md p-4 mx-auto bg-white shadow-md rounded-md"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Email Id
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter your Email Id"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md"
        >
          {loading ? "Loading..." : title}
        </button>
      </form>
      {title === "Sign Up" ? (
        <Link to="/signin">Go To SignIn Page</Link>
      ) : (
        <Link to="/">Go To SignUp Page</Link>
      )}
    </div>
  );
};

export default AuthForm;
