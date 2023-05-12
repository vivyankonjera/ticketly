import { useEffect, useState } from "react";
import Tickets from "./Tickets";

const Dashboard = () => {
  let [name, setName] = useState("Jin Yang");
  let [isLoading, setIsLoading] = useState(true);

  const getData = async () => {

    const res = await fetch('http://localhost:3001/tickets');
    const data = await res.json();
    
    return data;

  }


  let [tickets, setTickets] = useState([]);

  useEffect(() => {

    setTimeout(() => {

      getData()
      .then(data => setTickets(data))
      .catch(err => console.log(err.message))

      setIsLoading(false)
      
    }, 1000);
    
    

   /*  fetch('http://localhost:3001/tickets')
      .then(res => {
        return res.json();
      }).then(data => {
        setTickets(data);
      }) */

  }, [])


  const handleClick = () => {
    console.log("Button workng");
    console.log(name);
    name = setName("Eric B");
  };

  return (
    <div className="dashboard">
      {isLoading && <div id="loadingWheel"></div>}
      <Tickets tickets = {tickets} />
      <button onClick={handleClick}>Button</button>
      <p>{name}</p>
    </div>
  );
};

export default Dashboard;
