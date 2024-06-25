import { useNavigate } from "react-router";
import { useLocation } from "react-router";

import Header from "../components/Header";

import "../styles/Login.css";

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;

    function goToSignUp () {
        navigate('/signup');
    };

    function goHome () {
        navigate('/');
    }


    return (
        <>
            <div className="header-container">
                <Header />
            </div>

            <main className="login">
                <div className="login-container">
                    <h2 className="login-header">Login</h2>
                    <hr />
                    
                    <h3 className="login-header">
                        Welcome back!
                    </h3>
                    <div className="input-container">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="emai" />

                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="email" />
                    </div>

                    <p className="small">Don't have an account? <span className="green" onClick={goToSignUp}>Sign Up</span> instead.</p>

                    <button className="continue"
                            onClick={goHome}>
                        Continue
                    </button>
                </div>
            </main>
        </>
        
    )
}