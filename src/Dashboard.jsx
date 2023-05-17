import { useEffect, useState } from "react";
import Tickets from "./Tickets";
import useFetch from "./useFetch";

const Dashboard = () => {
  let [name, setName] = useState("Jin Yang");
  const {error, isLoading, data: tickets} = useFetch("http://localhost:3001/tickets"); 
 

  const handleClick = () => {
    console.log("Button workng");
    console.log(name);
    name = setName("Eric B");
  };

  return (
    <div className="dashboard">
      {error && <p>{error}</p>}
      {isLoading && <div id="loadingWheel"></div>}
      <Tickets tickets = {tickets} />
      <button onClick={handleClick}>Button</button>
      <p>{name}</p>
    </div>
  );
};

export default Dashboard;
