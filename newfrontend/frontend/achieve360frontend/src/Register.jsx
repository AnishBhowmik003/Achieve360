import React, { useState } from 'react';

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('student');
    const [sport, setSport] = useState(''); // New state for selecting sport

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        let postData = {
            email: email,
            pass: pass,
            name: name,
            role: role
        };

        if (role === 'coach') {
            postData.sport = sport;
        }
    
        console.log(JSON.stringify(postData)); 

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
                props.onRegisterSuccess(postData);
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
                <label htmlFor="email">Email</label>
                <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="email" 
                    placeholder="yourEmail@email.com" 
                    id="email" 
                    name="email"
                />
                <label htmlFor="password">Password</label>
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
                {role === 'coach' && ( 
                    <>
                        <label htmlFor="sport">Sport</label>
                        <select
                            value={sport}
                            onChange={(e) => setSport(e.target.value)}
                            id="sport"
                            name="sport"
                        >
                            <option value="">Select a sport</option>
                            <option value="running">Running</option>
                            <option value="basketball">Basketball</option>
                            <option value="baseball">Baseball</option>
                            <option value="football">Football</option>
                        </select>
                    </>
                )}
                <button type="submit">Register</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>
                Already have an account? Login here.
            </button>
        </div>
    );
}
