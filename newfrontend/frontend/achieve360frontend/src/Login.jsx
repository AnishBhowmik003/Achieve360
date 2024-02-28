import React, {useState} from "react";
export const Login = (props) => {
    const[email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        
        <div className="auth-form-container">
            <h1 className="auth-title">ACHIEVE 360</h1> {}
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlfor="email">email</label>
                <input value = {email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="yourEmail@email.com" id="email" name="email"/>
                <label htmlfor="password">password</label>
                <input value = {pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here. </button>
        </div>
    )
}