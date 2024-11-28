import { useEffect, useState } from "react";
import Todo from "../components/Todo";

export default function Todos() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [add, setAdd] = useState(false);
    const [todoArr, setTodoArr] = useState([]);
    const [newTodo, setNewTodo] = useState({});
    const todosIsEmpty = todoArr.length === 0;

    useEffect(() => {
        (async () => {
            try {

                const res = await fetch(`http://localhost:3000/todos?user_id=${currentUser.id}`);
                if (!res.ok) throw Error("couldn't get todos");
                setTodoArr(await res.json());

            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    function handleInputChange(e) {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setNewTodo((prev) => ({ ...prev, [name]: value }));

    }

    async function handleAddTodo(e) {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3000/todos?user_id=${currentUser.id}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(
                        {
                            "title": newTodo.title,
                            "completed": false
                        }
                    )
                });
            if (!res.ok) throw Error("unable to add todo");
            const newId = await res.json();
            setTodoArr(prev => [...prev, { id: newId, title: newTodo.title, completed: 0, user_id: currentUser.id }]);
            setAdd(false)
        }
        catch (err) {
            console.log(err);
        }



    }

    return (
        <>
            <h1>Todos</h1>
            <button onClick={() => setAdd(prev => !prev)}>add</button>
            {add && <form onSubmit={handleAddTodo}>
                <label>
                    Title: 
                    <input type="text" name="title" value={newTodo.title || ""} onChange={handleInputChange} />
                </label>
                <br />
                <button>submit</button>
            </form>
}
            {!todosIsEmpty &&
                <div className="todos-container">
                    {todoArr.map((todo) => {
                        return (
                            <Todo todo={todo}
                                setTodoArr={setTodoArr}
                                key={todo.id} />
                        )
                    })}
                </div>

            }
            {todosIsEmpty && <p>Looks like you have no todos..</p>}
            


        </>
    );
}