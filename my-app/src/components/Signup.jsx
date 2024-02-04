import React, { useState } from "react";
import '../style/signup.css'
import { useNavigate } from 'react-router-dom';
import { Input } from "antd";

function SignUp({ setSignName, setSignPassword }) {

    const page = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateInputs()) {
            page('/')
            console.log('Form submitted successfully');
        }
    };

    const validateInputs = () => {
        let success = true;

        if (username.trim() === '') {
            success = false;
            setUsernameError('Username is required');
        } else {
            setUsernameError('');
        }

        if (password === '') {
            success = false;
            setPasswordError('Password is required');
        } else if (password.length < 8) {
            success = false;
            setPasswordError('Password must be at least 8 characters long');
        } else if (!containsUppercase(password)) {
            success = false;
            setPasswordError('Password must contain at least one uppercase letter');
        } else if (!containsLowercase(password)) {
            success = false;
            setPasswordError('Password must contain at least one lowercase letter');
        } else if (!containsSpecialCharacter(password)) {
            success = false;
            setPasswordError('Password must contain at least one special character');
        } else if (!containsNumber(password)) {
            success = false;
            setPasswordError('Password must contain at least one number');
        } else {
            setPasswordError('');
        }

        return success;
    };

    const containsUppercase = (str) => {
        return /[A-Z]/.test(str);
    };

    const containsLowercase = (str) => {
        return /[a-z]/.test(str);
    };

    const containsSpecialCharacter = (str) => {
        return /[!@#$%^&*(),.?":{}|<>]/.test(str);
    };

    const containsNumber = (str) => {
        return /\d/.test(str);
    };

    return (
        <div className="register">
            <div className="signupcontainer">
                <form onSubmit={handleSubmit} className='form' >
                    <p className='p'>CREATE ACCOUNT</p>
                    <div className={`input-group ${usernameError && 'error'}`}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => { handleChange(e); setSignName(e.target.value) }}
                        />
                        <div className="error">{usernameError}</div>
                    </div>
                    <div className={`input-group ${passwordError && 'error'}`}>
                        <label htmlFor="password">Password</label>
                        <Input.Password
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => { handleChange(e); setSignPassword(e.target.value) }}
                        />
                        <div className="error">{passwordError}</div>
                    </div>
                    <button type="submit" onClick={(e) => { handleSubmit(e) }} className="button" >SIGN UP</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
