import { Link } from "react-router-dom";

const Dashboard = () => {
  return <div>
    <h1>Protected Dashboard Page</h1>
    <Link to="/" className="underline">Sign Out</Link>
  </div>;
};

export default Dashboard;
