import { useState } from 'react';
import { useNavigate } from "react-router";


import Header from "../components/Header";

import "../styles/Signup.css"

export default function Signup() {
    // const [ userType, setUserType ] = useState("buyer");
    const [ formData, setFormData ] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        state: "",
        city: "",
        password: "",
        confirmPassword: "",
        userType: "",
    });

    const [errors, setErrors] = useState({});
    const [ message, setMessage ] = useState("");

    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prevState => ({...prevState, [name]: value}));

        const newErrors = validateInput(name, value);
        setErrors(newErrors);
    }

    function goHome () {
        navigate('/produce');
    };

    function goToDashboard() {
        navigate('/dashboard');
    }

    function goToLogin () {
        navigate('/login');
    };

    function validateInput(name, value) {
        const newErrors = { ...errors }; // Copy existing errors
        switch (name) {
            case 'firstName':
                if (!value || value === "") {
                    newErrors.firstName = (<p className='input-error'>
                        First name cannot be empty
                    </p>)
                } else if (value.length < 3) {
                    newErrors.firstName = (<p className='input-error'>
                        First name must be at least 3 characters long
                    </p>)
                } else {
                    delete newErrors.firstName;
                }
                break;
            case 'lastName':
                if (!value || value === "") {
                    newErrors.lastName = (<p className='input-error'>
                        Last name cannot be empty
                    </p>)
                } else if (value.length < 3) {
                    newErrors.lastName = (<p className='input-error'>
                        Last name must be at least 3 characters long
                    </p>)
                } else {
                    delete newErrors.lastName;
                }
                break;
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
                case 'phone':
                    let phoneRegex = /^(?:\+?(\d{1,3}))?[-. (]*(\d{1,4})[-. )]*(\d{1,4})[-. ]*(\d{1,9})(?: *x(\d+))?$/;
                    if (!phoneRegex.test(value)) {
                        newErrors.phone = (<p className='input-error'>
                            Please enter a valid phone number (Example: +123456789012)
                        </p>)
                    } else {
                        delete newErrors.phone;
                    }
                    break;
                case 'state':
                    if (value && value.length < 4) {
                        newErrors.state = (<p className='input-error'>
                            Please enter a valid state name
                        </p>)
                    } else {
                        delete newErrors.state;
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
                case 'confirmPassword':
                    const passwd = formData.password;
                    if(value !== passwd) {
                        newErrors.confirmPassword = newErrors.password = (<p className='input-error'>
                            passwords do not match
                        </p>)
                    } else {
                        delete newErrors.confirmPassword;
                    }
                    break;
                case 'userType':
                    if(!value) {
                        newErrors.userType = newErrors.password = (<p className='input-error'>
                        please make a selection
                    </p>)
                    } else {
                        delete newErrors.userType;
                    }
                default:
                    break;
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
        }

        if (formData.userType === "buyer") {
            goHome();
        } else if (formData.userType === "vendor") {
            goToDashboard()
        } else {
            newErrors = validateInput("userType", formData.userType);
        }
    }

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
                        <input type="text" name="firstName" id="first-name" 
                               onChange={handleChange}
                               aria-describedby={`firstName-error ${errors.firstName ? 'error' : ''}`}
                               required={true}
                            />
                        <span id='firstname-error' className='error-message'>
                            {errors.firstName}
                        </span>

                        <label htmlFor="last-name">Last name</label>
                        <input type="text" name="lastName" id="last-name"
                               onChange={handleChange}
                               aria-describedby={`lastName-error ${errors.lastName ? 'error' : ''}`}
                               required={true}
                            />
                        <span id='lastname-error' className='error-message'>
                            {errors.lastName}
                        </span>

                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email"
                               onChange={handleChange}
                               aria-describedby={`email-error ${errors.email ? 'error' : ''}`}
                               required={true}
                            />
                        <span id='email-error' className='error-message'>
                            {errors.email}
                        </span>

                        <label htmlFor="phone">Phone number</label>
                        <input type="text" name="phone" id="phone"
                               onChange={handleChange}
                               aria-describedby={`phone-error ${errors.phone ? 'error' : ''}`}
                               required={true}
                            />
                        <span id='phone-error' className='error-message'>
                            {errors.phone}
                        </span>

                        <label htmlFor="state">State</label>
                        <input type="text" name="state" id="state"
                               onChange={handleChange}
                               aria-describedby={`state-error ${errors.city ? 'error' : ''}`}
                               required={true}
                            />
                        <span id='state-error' className='error-message'>
                            {errors.state}
                        </span>

                        <label htmlFor="city">City</label>
                        <input type="text" name="city" id="city"
                               onChange={handleChange}
                               required={true} />

                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password"
                               onChange={handleChange}
                               aria-describedby={`password-error ${errors.password ? 'error' : ''}`}
                               required={true}
                            />
                        <span id='password-error' className='error-message'>
                            {errors.password}
                        </span>

                        <label htmlFor="confirm-passwprd">Confirm password</label>
                        <input type="password" name="confirmPassword" id="confirm-password"
                               onChange={handleChange}
                               aria-describedby={`confirmPassword-error ${errors.confirmPassword ? 'error' : ''}`}
                               required={true}
                            />
                        <span id='confirmpassword-error' className='error-message'>
                            {errors.confirmPassword}
                        </span>

                        <div className="radio-container">
                            <div className="buyer">
                                <input type="radio" name="userType" id="buyer" value="buyer"
                                       onClick={handleChange} />
                                <label htmlFor="buyer">I want to buy groceires</label>
                            </div>

                            <div className="vendor">
                                <input type="radio" name="userType" id="vendor" value="vendor"
                                       onClick={handleChange} />
                                <label htmlFor="vendor">I want to sell groceries</label>
                            </div>
                        </div>
                        <span id='confirmpassword-error' className='error-message'>
                            {errors.userType}
                        </span>

                    </div>

                    <p className="small">Already have an account? <span className="green" onClick={goToLogin}>Login</span> instead.
                    </p>

                    <div className="signup-btn-container">
                        <button className="continue"
                                onClick={handleSubmit}>
                            Continue
                        </button>
                    </div>
                    {message && message}
                </div>
            </main>  
        </>
    )
}