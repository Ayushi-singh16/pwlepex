import React, { useState } from "react";

function CommentForm({ ticketId }) {
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("CUSTOMER");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/tickets/${ticketId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, author })
      });
      const data = await res.json();
      if (!data.status) throw new Error(data.error);
      setMessage("");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea placeholder="Comment" value={message} onChange={e => setMessage(e.target.value)} /><br />
      <select value={author} onChange={e => setAuthor(e.target.value)}>
        <option>CUSTOMER</option>
        <option>AGENT</option>
      </select><br />
      <button type="submit">Add Comment</button>
    </form>
  );
}

export default CommentForm;
