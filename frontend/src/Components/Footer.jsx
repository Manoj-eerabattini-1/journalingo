import React from "react";

export function Footer() {
    function getYear() {
        const yr = new Date().getFullYear();
        return yr;  
    }

    return (
        // <div className="bg-gray-200">
            <footer className="bg-gray-200 w-full p-4 flex justify-center ">Copyright@ {getYear()}</footer>
        // </div>
    );
}