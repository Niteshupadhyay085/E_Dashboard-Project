import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");

    const Navigate = useNavigate();

    useEffect(() =>{
        const auth = localStorage.getItem('user');
        if(auth) {
            Navigate("/")
        }
    })

    const handleLogin = async () => {
        console.log("email,password", email, password);
        let result = await fetch("http://localhost:5000/login", {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result)
        if (result.auth) {
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));
            Navigate("/")
        }
        else {
            alert("Please enter correct detail");
        }
    }


    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" className="inputBox" placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)} value={email} />

            <input type="text" className="inputBox" placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)} value={password} />

            <button onClick={handleLogin} className="appButton" type="button">Login</button>
        </div>
    )
}

export default Login;