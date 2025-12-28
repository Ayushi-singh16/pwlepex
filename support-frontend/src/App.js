import React, { useState } from "react";
import TicketForm from "./TicketForm";
import TicketList from "./TicketList";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Customer Support Tickets</h1>
      <TicketForm onSuccess={() => setRefresh(!refresh)} />
      <hr />
      <TicketList refresh={refresh} />
    </div>
  );
}

export default App;
