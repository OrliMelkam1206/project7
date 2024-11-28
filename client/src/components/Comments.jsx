import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { API_URL } from "../functions/API_URL";

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [add, setAdd] = useState(false);
  const [newBody, setNewBody] = useState("");
  const [newTitle, setNewTitle] = useState("")
  const [commentingUsername, setCommentingUsername] = useState();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    (async () => {
      try {
        const result = await fetch(`${API_URL}/comments/${postId}`)
        console.log('result: ', result);
        if (result.status !== 200) throw await result.text();
        const data = await result.json();
        console.log('data: ', data);
        if (data.length === 0) {
          setError("this post have no comments")
        } else {

          setError(null);
        }
        setComments(data);
      } catch (err) {
        console.log('err: ', err);
      }
    })()
  }, []);


  async function addComment(e) {
    try {
      e.preventDefault();
      const newComment = {
        title: newTitle,
        user_id: currentUser.id,
        body: newBody,
        post_id: parseInt(postId),
      };
      const postOption = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      };
      const result = await fetch(`${API_URL}/comments`, postOption);
      console.log('result: ', result);
      if (result.status !== 200) throw await result.text();
      const data = await result.json();
      console.log('data: ', data);
      const newComments = comments;
      newComments.push({
        id: data.insertId,
        title: newTitle,
        user_id: currentUser.id,
        body: newBody,
        post_id: parseInt(postId),
      })
      console.log('newComments: ', newComments);
      setError(null);
      setComments(newComments);
      setAdd(false)
    } catch (err) {
      console.log('err: ', err);
      // setError(err)
    }

  }

  async function handledeleteItem(comment) {
    try {
      const deleteOption = {
        method: "DELETE",
      };
      const response = await fetch(`${API_URL}/comments/${comment.id}`, deleteOption);
      console.log('response: ', response);

      if (!response.ok) throw await response.text();

      const newList = comments.filter((item) => item.id !== comment.id);
      setComments(newList);
      setError(null);
    }
    catch (err) {
      console.log('err: ', err);
      setError(err);
    }
  }
  return (
    <>
      {error !== null && <p>{error}</p>}
      <main className="comments-container">
        {comments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              comment={comment}
              handledeleteItem={handledeleteItem}
            />
          );
        })}
      </main>
      <button onClick={() => setAdd((prev) => !prev)}>add</button>
      {add && (
        <form>
          <label>title:</label><br />
          <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)}></input><br />
          <label>Body:</label><br />
          <input value={newBody} onChange={(e) => setNewBody(e.target.value)}></input><br />
          <button onClick={addComment}>save</button>
        </form>
      )}
    </>
  );
}