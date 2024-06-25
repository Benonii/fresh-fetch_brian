import "../styles/Header.css";
import { useNavigate } from "react-router";

export default function Header() {
    const navigate = useNavigate();

    const goToProducePage = () => {
        navigate('/produce');
    }
    return (
        <div className="header">
            <h1 onClick={goToProducePage}>Fresh Fetch</h1>
        </div>
    );
}