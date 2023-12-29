import React, { useState } from "react";
import { useAppDispatch } from "../Redux/hooks";
import axios from "axios";
import { setToken } from "../Redux/features/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import "../tailwind.css";
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
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="mx-auto w-[40vw] space-y-6">
        <h1 className="text-3xl font-bold text-center">{title}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-center">
          Enter your credentials to
          {title === "Sign Up" ? " create new account" : " access your account"}
        </p>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-600">
            Email Id
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter your email id"
            required
          />
        </div>
        <div className="space-y-4">
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
          className="w-full p-2 bg-black text-white rounded-md"
        >
          {loading ? "Loading..." : title}
        </button>
        <div className="space-y-4 text-center">
          {title === "Sign Up" ? (
            <>
              <span>Account already exists? </span>
              <Link to="/signin" className="underline">
                Sign In
              </Link>
            </>
          ) : (
            <>
              <span>Don't have an account? </span>
              <Link to="/" className="underline">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
