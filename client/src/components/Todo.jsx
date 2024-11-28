import { useState } from "react";

export default function Todo({ todo, setTodoArr }) {
    const [showEditSection, setShowEditSection] = useState(false);
    const [newTitle, setNewTitle] = useState(null);

    function toggleShowEditSection(e) {
        e.preventDefault();
        setShowEditSection(prev => !prev);
    }

    async function handleCheckChange(e) {
        const value = e.target.checked;
        try {

            // update db and todo
            const res = await fetch(`http://localhost:3000/todos/${todo.id}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(
                        {
                            "completed": value
                        }
                    )
                }
            );
            if (!res.ok) throw Error("couldn't update todo");
            setTodoArr(prev => {
                return prev.map(item => { return item.id === todo.id ? { ...todo, completed: value ? 1 : 0 } : item });
                //find this todo by id, change checked

            });

        }
        catch (err) {
            alert(err);
        }
    }

    function handleTitleChange(e) {
        e.preventDefault();
        const value = e.target.value;
        setNewTitle(value);
    }

    async function handleTitleSubmit() {
        try {

            // update db and todo
            const res = await fetch(`http://localhost:3000/todos/${todo.id}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(
                        {
                            "title": newTitle
                        }
                    )
                }
            );
            if (!res.ok) throw Error("couldn't update todo");
            setTodoArr(prev => {
                return prev.map(item => { return item.id === todo.id ? { ...todo, title: newTitle } : item });
                //find this todo by id, change checked

            });

        }
        catch (err) {
            alert(err);
        }
    }

    return (

        <div >
            <p>{todo.title}
                <input type="checkbox" onChange={handleCheckChange}
                    checked={todo.completed === 0 ? false : true}
                />
            </p>

            <button onClick={toggleShowEditSection}>{showEditSection ? "Close" : "Edit"}</button>
            {showEditSection &&
                <form onSubmit={handleTitleSubmit}>
                    <label>
                        Title:
                        <input type="text" onChange={handleTitleChange} value={newTitle || ""} name="title" />
                    </label>
                    <input type="submit" />
                </form>
            }

        </div>
    );
}