import React, { useState } from "react";

function TicketForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("LOW");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, priority })
      });

      const data = await res.json();
      if (!data.status) throw new Error(data.error);
      setTitle(""); setDescription(""); setPriority("LOW");
      onSuccess();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Ticket</h2>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} /><br />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} /><br />
      <select value={priority} onChange={e => setPriority(e.target.value)}>
        <option>LOW</option>
        <option>MEDIUM</option>
        <option>HIGH</option>
      </select><br />
      <button type="submit">Create Ticket</button>
    </form>
  );
}

export default TicketForm;
