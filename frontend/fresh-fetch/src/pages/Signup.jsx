import { useNavigate } from "react-router";
import { useLocation } from "react-router";

import Header from "../components/Header";

import "../styles/Signup.css"

export default function Signup() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;

    function goHome () {
        navigate('/produce');
    };

    function goToLogin () {
        navigate('/login');
    };

    return (
        <>
            <div className="header-container">
                <Header />
            </div>

            <main className="signup">
                <div className="signup-container">
                    <h2 className="signup-header">Sign up</h2>
                    <hr />
                    
                    <h3 className="signup-header3">
                        Welcome!
                    </h3>
                    <div className="input-container">
                        <label htmlFor="first-name">First name</label>
                        <input type="text" name="first-name" id="first-name" />

                        <label htmlFor="last-name">Last name</label>
                        <input type="text" name="last-name" id="last-name" />

                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" />

                        <label htmlFor="phone">Phone number</label>
                        <input type="text" name="phone" id="phone" />

                        <label htmlFor="state">State</label>
                        <input type="text" name="state" id="state" />

                        <label htmlFor="city">City</label>
                        <input type="text" name="city" id="city" />

                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" />

                        <label htmlFor="confirm-passwprd">Confirm password</label>
                        <input type="password" name="confirm-password" id="confirm-password" />
                    </div>

                    <p className="small">Already have an account? <span className="green" onClick={goToLogin}>Login</span> instead.
                    </p>

                    <div className="signup-btn-container">
                        <button className="continue"
                                onClick={goHome}>
                            Continue
                        </button>
                    </div>
                </div>
            </main>
           
        </>
    )
}