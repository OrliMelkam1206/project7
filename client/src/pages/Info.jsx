
export default function Info() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    return (
        <>
            <h1>Info</h1>

            <h3>Username:</h3>
            <p>{currentUser.user_name}</p>

            <h3>Name:</h3>
            <p>{currentUser.name}</p>

            <h3>Email:</h3>
            <p>{currentUser.email}</p>
        </>
    );
}