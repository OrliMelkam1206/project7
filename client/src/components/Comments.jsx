import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { API_URL } from "../functions/API_URL";

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [add, setAdd] = useState(false);
  const [newBody, setNewBody] = useState("");
  const [commentingUsername, setCommentingUsername] = useState();

  useEffect(() => {
    (async () => {
        try{
        const result = await fetch(`${API_URL}/comments/${postId}`)
        console.log('result: ', result);
        if (result.status !== 200) throw await result.text();
        const data = await result.json();
        console.log('data: ', data);
        if(data.length === 0){
          setError("this post have no comments")
        }else{

          setError(null);
        }
        setComments(data);
        }catch(err){
          console.log('err: ', err);
        }
    })()
  }, []);


  function addComment(e) {
    const newComment = {
      postId: parseInt(postId),
      name: commentingUsername,
      body: newBody,
    };
    addItem(e, newComment, "comments", setError, setComments, setAdd);
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
              // handledeleteItem={handledeleteItem}
            />
          );
        })}
      </main>
      <button onClick={() => setAdd((prev) => !prev)}>add</button>
      {add && (
        <form>
          <label>Commenting user name:</label><br/>
          <input
            onChange={(e) => setCommentingUsername(e.target.value)}
          ></input><br/>
          <label>Body:</label><br/>
          <input onChange={(e) => setNewBody(e.target.value)}></input><br/>
          <button onClick={addComment}>save</button>
        </form>
      )}
    </>
  );
}