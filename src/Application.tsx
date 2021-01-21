import React from "react";
import { Link, RouteComponentProps, Router } from "@reach/router";

const App = () => (
  <div>
    <h1>Tutorial!</h1>
    <nav>
      <Link to="/">Home</Link> <Link to="dashboard">Dashboard</Link>
    </nav>
    <Router>
      <Home path="/" />
      <Dashboard path="/dashboard" />
    </Router>
  </div>
);

const Home = (props: RouteComponentProps) => (
  <div>
    <h2>Welcome Home</h2>
  </div>
);

const Dashboard = (props: RouteComponentProps) => (
  <div>
    <h2>Dashboard</h2>
  </div>
);

export default App;
