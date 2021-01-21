import React from "react";
import { Link, RouteComponentProps, Router } from "@reach/router";
import AddDay from "./pages/add-day/AddDay";
import LeftNav from "./components/LeftNav";
import "./Application.scss";

const App = () => (
  <>
    <LeftNav />
    <Router>
      <Home path="/" />
      <Dashboard path="/dashboard" />
    </Router>
  </>
);

const Home = (props: RouteComponentProps) => (
  <nav>
    <Link to="/">Home</Link> <Link to="dashboard">Dashboard</Link>
  </nav>
);

const Dashboard = (props: RouteComponentProps) => <AddDay />;

export default App;
