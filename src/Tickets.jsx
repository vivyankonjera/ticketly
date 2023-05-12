import { useState } from "react";

const Tickets = ({tickets}) => {

    let handleDelete = (id) => {}

    return ( 
        <div>
            {tickets.map((ticket) => (
                <div className="ticketPreview" key={ticket.id}>
                    <h4 className="ticketName">{ticket.ticketName}</h4>
                    <p className="ticketPlatform">{ticket.platform}</p>
                    <p className="raisedBy">{ticket.user}</p>
                    <button onClick={() => handleDelete(ticket.id)}>X</button>
                </div>
            ))}
        </div>   
     );
}
 
export default Tickets;