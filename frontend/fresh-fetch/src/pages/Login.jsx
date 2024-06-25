import { useNavigate } from "react-router";
import { useState } from "react";

import Header from "../components/Header";

import "../styles/Login.css";

export default function Login() {

    const [ formData, setFormData ] = useState({
        email: "",
        password: "",
    });

    const [ errors, setErrors ] = useState({});
    const [ message, setMessage ] = useState("");
    
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prevState => ({...prevState, [name]: value}));

        const newErrors = validateInput(name, value);
        setErrors(newErrors);
    }

    const navigate = useNavigate();

    function goToSignUp () {
        navigate('/signup');
    };

    function goHome () {
        navigate('/');
    }

    function goToDashboard () {
        navigate('/dashboard');
    }

    function validateInput(name, value) {
        const newErrors = { ...errors }; // Copy existing errors
        switch(name) {
            case 'email':
                const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                const parts = value.split('@');
                if (!value || value === "") {
                    newErrors.email = (<p className='input-error'>
                        Email cannot be empty
                    </p>)
                } else if (value.length > 320) {
                    newErrors.email = (<p className='input-error'>
                        Email too long
                    </p>)
                } else if (!regex.test(value)) {
                    newErrors.email = (<p className='input-error'>
                        Please enter a valid email
                    </p>)
                } else if (parts[0].length > 64 ||
                           parts[1].length > 255) {
                     newErrors.email = (<p className='input-error'>
                            Please enter a valid email
                        </p>)
                } else {
                   delete newErrors.email;
                }
                break;
                case 'password':
                    const password = value;
                    // const passwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
                    if (!value || value === "") {
                        newErrors.password = (<p className='input-error'>
                            Password cannot be empty
                        </p>)
                    } else if (value.length < 8) {
                        newErrors.password = (<p className='input=error'>
                            password must be 8 or more characters
                        </p>)
                    } else if(!/[A-Z]/.test(value)){
                        newErrors.password = (<p className='input-error'>
                            Password must contain at least one upper case letter
                        </p>)
                    } else if (!/[a-z]/.test(value)) {
                        newErrors.password = (<p className='input-error'>
                            password must contain atleast one lowercase letter
                        </p>)
                    } else if (!/\d/.test(value)) {
                        newErrors.password = (<p className='input-error'>
                            password must contain at least one number
                        </p>)
                    } else if (!/[!@#$%^&*]/.test(value)) {
                        newErrors.password = (<p className='input-error'>
                            password must contain at least onespecial character (!@#$%^&*)
                    </p>)
                    } else {
                        delete newErrors.password
                    }
                    break;
                default: break;
        }
        return newErrors;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const formKeys = Object.keys(formData);
        const formValues = Object.values(formData);

        let newErrors = {};

        for (let i = 0;  i < formKeys.length; i++) {
            newErrors = {...newErrors, ...validateInput(formKeys[i], formValues[i])};
        }

        setErrors(newErrors);

        const hasErrors = Object.keys(newErrors).length > 0;
        if (hasErrors) {
            setMessage(<p className="submit-error">Please fix all form errors before submitting</p>)
            return;
        } else {
            setMessage(null);
            goHome();
        }

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
                        <input type="text" name="email" id="email"
                               onChange={handleChange}
                               aria-describedby={`email-error ${errors.email ? 'error' : ''}`}
                               required={true}
                            />
                        <span id='email-error' className='login-error-message'>
                            {errors.email}
                        </span>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password"
                             onChange={handleChange}
                             aria-describedby={`password-error ${errors.password ? 'error' : ''}`}
                             required={true}
                          />
                      <span id='password-error' className='login-error-message'>
                          {errors.password}
                      </span>
                    </div>

                    <p className="small">Don't have an account? <span className="green" onClick={goToSignUp}>Sign Up</span> instead.</p>

                    <button className="continue"
                            onClick={handleSubmit}>
                        Continue
                    </button>
                    {message && message}

                </div>
            </main>
        </>
        
    )
}