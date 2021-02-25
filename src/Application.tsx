import React from "react";
import { RouteComponentProps, Router } from "@reach/router";
import AddDay from "./pages/add-day/AddDay";
import TopNav from "./components/TopNav";
import "./Application.scss";
import WeekView from "./components/WeekView";

const App = () => (
  <>
    <TopNav />
    <Router>
      <Home path="/" />
      <Dashboard path="/dashboard" />
    </Router>
  </>
);

const Home = (props: RouteComponentProps) => <WeekView />;

const Dashboard = (props: RouteComponentProps) => <AddDay />;

export default App;
