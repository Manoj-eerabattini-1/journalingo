import React from "react";
import { useNavigate } from "react-router-dom";

export function Card({ content, createdAt, id }) {
    const navigate = useNavigate();

    function formatDate(timestamp) {
        return new Date(timestamp).toLocaleString('en-GB');
    }
    return (
        <>
            <div className="flex flex-col w-[95%] p-3 border-black bg-blue-200 mx-auto m-4 rounded cursor-pointer hover:bg-blue-300 scale-100  hover:scale-105 transition-transform duration-150"
                onClick={() => navigate(`/entry/${id}`)}
            >
                <div className="text-lg font-semibold text-gray-950"> 
                    <span className="italic">Last updated at : </span>
                     {  formatDate(createdAt) } 
                </div>
                <p className="text-sm mt-3 text-gray-800">{content} {content.length >= 50 ? "..." : ""}</p>
            </div>
        </>
    )
}