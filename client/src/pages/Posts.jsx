import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { API_URL } from "../functions/API_URL";
import App from "../App";

export default function Posts() {
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);
    const [add, setAdd] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newBody, setNewBody] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const userId = JSON.parse(localStorage.getItem("currentUser")).id;

    useEffect(() => {
        (async () => {
            const result = await fetch(`${API_URL}/posts?user_id=${userId}`)
            console.log('result: ', result);
            const data = await result.json();
            setPosts(data);
        })()
    }, []);

    // function handledeleteItem(item) {
    //     handleDelete(posts, item, setPosts, "posts", setError);
    // }

    async function addPost(e) {
        try {
            e.preventDefault();
            const newPost = {
                userId: parseInt(userId),
                title: newTitle,
                body: newBody,
            };
            const postOption = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPost),
            };
            const result = await fetch(`${API_URL}/posts`, postOption);
            console.log('result: ', result);
            if (result.status !== 200) throw await result.text();
            const data = await result.json();
            console.log('data: ', data);
            const newPosts = posts;
            newPosts.push({
                id: data.insertId,
                title: newTitle,
                userId: parseInt(userId),
                body: newBody
            })
            console.log('newPosts: ', newPosts);
            setError(null);
            setPosts(newPosts);
            setAdd(false)
        } catch (err) {
            setError(err)
        }

    }


    return (
        <>
            <h1>Posts</h1>
            {error !== null && <p>{error}</p>}
            <button onClick={() => setAdd((prev) => !prev)}>add</button>
            {add && (
                <form>
                    <label>Title:</label><br />
                    <input onChange={(e) => setNewTitle(e.target.value)}></input><br />
                    <label>Body:</label><br />
                    <input onChange={(e) => setNewBody(e.target.value)}></input><br />
                    <button onClick={addPost}>save</button>
                </form>
            )}
            {/* <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <button onClick={handleSearch}>search</button> */}
            <main className="posts-container">
                {posts.map((item) => {
                    return (
                        <Post
                            key={item.id}
                            item={item}
                            // handledeleteItem={handledeleteItem}
                            setError={setError}
                        />
                    );
                })
                }
            </main>
        </>
    );
}