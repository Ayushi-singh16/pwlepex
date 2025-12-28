import React, { useEffect, useState } from "react";

function CommentList({ ticketId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/tickets/${ticketId}/comments`)
      .then(res => res.json())
      .then(data => setComments(data.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h4>Comments:</h4>
      {comments.map(c => (
        <div key={c._id} style={{ marginLeft: "20px" }}>
          <b>{c.author}:</b> {c.message}
        </div>
      ))}
    </div>
  );
}

export default CommentList;
