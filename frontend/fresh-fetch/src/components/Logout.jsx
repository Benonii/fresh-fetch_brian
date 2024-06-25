import "../styles/Logout.css";

export default function Logout({ handleLogout }) {
    return (
        <button className="logout" onClick={handleLogout}>Logout</button>
    )
}