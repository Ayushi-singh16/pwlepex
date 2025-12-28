import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

function TicketList({ refresh }) {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/tickets")
      .then(res => res.json())
      .then(data => setTickets(data.data))
      .catch(err => console.log(err));
  }, [refresh]);

  return (
    <div>
      <h2>Tickets</h2>
      {tickets.map(ticket => (
        <div key={ticket._id} style={{ border: "1px solid black", padding: "10px", margin: "10px 0" }}>
          <h3>{ticket.title} ({ticket.priority})</h3>
          <p>{ticket.description}</p>
          <CommentForm ticketId={ticket._id} />
          <CommentList ticketId={ticket._id} />
        </div>
      ))}
    </div>
  );
}

export default TicketList;
