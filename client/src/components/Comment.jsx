import React, { useEffect, useState } from "react";
import { API_URL } from "../functions/API_URL";

export default function Comment({ comment, handledeleteItem }) {
    const [commenterName, setCommenterName] = useState("");
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(JSON.parse(localStorage.getItem("currentUser")).id);


    useEffect(() => {
        (async () => {
            try {
                const result = await fetch(`${API_URL}/users/${comment.user_id}`)

                console.log('result: ', result);
                if (result.status !== 200) throw await result.text();
                const data = await result.json();
                console.log('data: ', data);
                setError(null);
                setCommenterName(data[0]);
            } catch (err) {
                console.log('err: ', err);
                // setError(err);
            }
        })()
    }, []);

    return (
        <div className="comment-div" key={comment.id}>
            <div className="comment-data">
                <span>{comment.id}</span>
                <br />
                <span>
                    <strong>commenter's name: </strong>
                    {commenterName?.user_name}
                </span>
                <br />
                <span>
                    <strong>comment: </strong>
                    {comment.body}
                </span>
            </div>
            <p>{error}</p>
            {userId === comment.user_id && <div className="comment-buttons">
                <button onClick={() => handledeleteItem(comment)}>delete</button>
            </div>}
        </div>
    );
}