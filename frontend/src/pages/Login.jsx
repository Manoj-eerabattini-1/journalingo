import React from "react";

export function Login() {
    return (
        <div>
            <h2>Login</h2>
            <input placeholder="Email" />
            <input placeholder="Password" />
            <button>Login</button>
            <p> 
                Don't have an account?
                <span onClick={() => Navigate("/register")}>Register</span>
            </p>
        </div>
    )
}