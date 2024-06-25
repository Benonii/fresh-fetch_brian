import "../styles/Header.css";
import { useNavigate } from "react-router";

export default function Header({ isVendor }) {
    const navigate = useNavigate();

    const goToProducePage = () => {
        navigate('/produce');
    }

    const goToVendorDashboard = () => {
        navigate('/dashboard');
    }
    return (
        <div className="header">
                {isVendor ? (
                    <h1 onClick={goToVendorDashboard}>Fresh Fetch</h1>
                ): (
                    <h1 onClick={goToProducePage}>Fresh Fetch</h1>
                )}
        </div>
    )
}