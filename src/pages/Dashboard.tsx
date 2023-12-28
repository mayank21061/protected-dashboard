import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../Redux/hooks";

const Dashboard = () => {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  if (!token) return null;
  else return <div>Protected Dashboard Page</div>;
};

export default Dashboard;
