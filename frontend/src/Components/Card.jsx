import React from "react";
import { useNavigate } from "react-router-dom";
import pencil from "../assets/pencil.png";

export function Card({ content, createdAt, id }) {
    const navigate = useNavigate();

    function formatDate(timestamp) {
        return new Date(timestamp).toLocaleString('en-GB');
    }
    function handleClick(e) {
        e.stopPropagation();
        navigate(`/entry/${id}/edit`);
    }
    return (
        <>
            <div className="flex flex-col w-[95%] p-3 border-black bg-blue-200 mx-auto m-4 rounded cursor-pointer hover:bg-blue-300 scale-100  hover:scale-105 transition-transform duration-150"
                onClick={() => navigate(`/entry/${id}`)}
            >
                <div className="flex justify-between">
                    <div className="text-lg font-semibold text-gray-950"> 
                        <span className="italic">Last updated at : </span>
                        {  formatDate(createdAt) } 
                    </div>
                    <button onClick={handleClick} className="border w-8 flex ml-auto rounded-md text-center p-1 cursor-pointer absolute right-2 top-2 text-sm">
                        <img src={pencil} alt="edit" className="w-5 h-5" />
                    </button>
                </div>
                    <p className="text-sm mt-3 text-gray-800">{content} {content.length >= 50 ? "..." : ""}</p>
            </div>
        </>
    )
}