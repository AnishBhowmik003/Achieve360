import React, {useState} from "react";
export const Login = (props) => {
    const[email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            email: email,
            pass: pass
        };
        try {
            const response = await fetch('http://localhost:6969/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            const data = await response.json();
            console.log(data);
            console.log(response);
    
            if (response.ok) {
                console.log(data);
                alert('Logging in');
                props.onLoginSuccess(data);
            } else {
                alert(`Invalid Username or Password.`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error while logging in');
        }
    }

    return (
        
        <div className="auth-form-container">
            <h1 className="auth-title">ACHIEVE 360</h1> {}
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value = {email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="yourEmail@email.com" id="email" name="email"/>
                <label htmlFor="password">password</label>
                <input value = {pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here. </button>
        </div>
    )
}