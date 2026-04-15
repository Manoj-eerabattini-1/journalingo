import React from "react";
import { Navigate } from "react-router-dom";

export function Register() {
    return (
        <div>
            <h2>Register</h2>
            <input placeholder="Email" />
            <input placeholder="Set Password" />
            <input placeholder="Confirm Password" />
            <button>Register</button>
            <p>
                Already Have an Account?
                <span onClick={() => Navigate("/login")}>Login</span>
            </p>
        </div>
    );
}