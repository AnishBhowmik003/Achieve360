import React, { useState } from 'react';

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('student'); 

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const postData = {
            email: email,
            pass: pass,
            name: name,
            role: role 
        };
    
        console.log(JSON.stringify(postData)); // This will now include the role

        try {
            const response = await fetch('http://localhost:6969/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            const data = await response.json();
    
            if (response.ok) {
                alert('Registration successful');
                props.onRegisterSuccess(data);
            } else {
                alert(`Registration failed. ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Registration failed');
        }
    }

    return (
        <div className='auth-form-container'>
            <h1 className="auth-title">ACHIEVE 360</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Full name</label>
                <input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    type="text"
                    placeholder="Full Name" 
                    id="name" 
                    name="name"
                />
                <label htmlFor="email">email</label>
                <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="email" 
                    placeholder="yourEmail@email.com" 
                    id="email" 
                    name="email"
                />
                <label htmlFor="password">password</label>
                <input 
                    value={pass} 
                    onChange={(e) => setPass(e.target.value)} 
                    type="password" 
                    placeholder="********" 
                    id="password" 
                    name="password"
                />
                <label htmlFor="role">Role</label>
                <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)} 
                    id="role" 
                    name="role"
                >
                    <option value="student">Student</option>
                    <option value="coach">Coach</option>
                </select>
                <button type="submit">Register</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>
                Already have an account? Login here.
            </button>
        </div>
    );
}
