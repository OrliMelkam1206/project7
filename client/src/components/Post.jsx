import React, { useState } from "react";
import Comments from "./Comments";

export default function Post({ item, handleSaveChanges, handledeleteItem }) {
  const [title, setTitle] = useState(item.title);
  const [isEdited, setIsEdited] = useState(false);
  const [showBody, setShowBody] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [userId, setUserId] = useState(JSON.parse(localStorage.getItem("currentUser")).id);



  return (
    <div className="post-div" key={item.id}>
      <span>{item.id}</span>
      <br />
      {isEdited ? (
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      ) : (
        <label>{title}</label>
      )}
      <br />
      <span>{showBody ? item.body : null}</span>

      {showComments ? (
        <div className="post-comments">
          <Comments postId={item.id} />
        </div>
      ) : null}

      <div className="post-buttons">
        {item.user_id === userId && (!isEdited ? (
          <button onClick={() => setIsEdited(true)}>edit</button>
        ) : (
          <button onClick={(e) => handleSaveChanges(e, item.id, title, setIsEdited)}>save</button>
        ))}
        <button onClick={() => setShowComments((prev) => !prev)}>
          Comments
        </button>
        <button onClick={() => setShowBody((prev) => !prev)}>Body</button>
        {userId === item.user_id && <button onClick={() => handledeleteItem(item)}>delete</button>}
      </div>
    </div>
  );
}