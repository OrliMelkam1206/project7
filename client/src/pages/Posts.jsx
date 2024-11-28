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
    const [startIndex, setStartIndex] = useState(0);
    const [showMore, setShowMore] = useState(true);
    const userId = JSON.parse(localStorage.getItem("currentUser")).id;

    useEffect(() => {
        (async () => {
            fetchPostsData()
            // const result = await fetch(`${API_URL}/posts`)
            // console.log('result: ', result);
            // const data = await result.json();
            // setPosts(data);
        })()
    }, []);

    const fetchPostsData = async () => {
        try {
            console.log("in")
            console.log('startIndex: ', startIndex);
            const response = await fetch(
                `${API_URL}/posts?_start=${startIndex}&_limit=6`
            );
            if (!response.ok) throw Error("Did not receive expected data");
            const data = await response.json();
            console.log('data: ', data);
            if (data.length === 0 && posts.length !== 0) {
                setShowMore(false);
                setError("There is no more posts");
            } else {
                if (data.length === 0 && posts.length === 0) {
                    setShowMore(false);
                    setError("There is no posts");
                }
                else {
                    if (posts.length === 0) {
                        setPosts(data);
                    } else {
                        setPosts((prev) => [...prev, ...data]);
                    }
                    setError(null);
                    setStartIndex((prev) => prev + 3);
                }
            }
        } catch (err) {
            setError(err.message);
        }
    };

    async function handledeleteItem(post) {
        try {
            const deleteOption = {
                method: "DELETE",
            };
            const response = await fetch(`${API_URL}/posts/${post.id}`, deleteOption);
            console.log('response: ', response);

            if (!response.ok) throw await response.text();

            const newList = posts.filter((item) => item.id !== post.id);
            setPosts(newList);
            setError(null);
        }
        catch (err) {
            console.log('err: ', err);
            setError(err);
        }
    }

    async function addPost(e) {
        try {
            e.preventDefault();
            const newPost = {
                user_id: parseInt(userId),
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
                user_id: parseInt(userId),
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
    async function handleSaveChanges(e, id, title, setIsEdited) {
        try {
            e.preventDefault();
            const patchOption = {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: title }),
            };
            const result = await fetch(`${API_URL}/posts/${id}`, patchOption);
            console.log('result: ', result);
            if (result.status !== 200) throw await result.text();
            // const data = await result.json();
            // console.log('data: ', data);
            const newPosts = posts;
            const postIndex = posts.findIndex(item => item.id === id);
            newPosts[postIndex].title = title;
            console.log('newPosts: ', newPosts);
            setError(null);
            setPosts(newPosts);
            setIsEdited(false)
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
                            handleSaveChanges={handleSaveChanges}
                            handledeleteItem={handledeleteItem}
                        />
                    );
                })
                }
            </main>
            {showMore && <button onClick={fetchPostsData}>showMore</button>}
        </>
    );
}