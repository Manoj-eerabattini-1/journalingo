import React from "react";
import { useNavigate } from "react-router-dom";

export function Card({ content, createdAt, id }) {
    const navigate = useNavigate();

    function formatDate(timestamp) {
        return new Date(timestamp).toLocaleString('en-GB');
    }
    return (
        <>
            <div className="flex flex-col w-[95%] p-3 border-black bg-blue-200 mx-auto m-4 rounded cursor-pointer"
                onClick={() => navigate(`/entry/${id}`)}
            >
                {/* <div>{getDate()}/{getMonth()}/{getYear()}  -  {getHours()}:{getMinutes()}:{new Date().getSeconds()} </div> */}
                <div> Last updated at : {  formatDate(createdAt) } </div>
                <p>{content} {content.length >= 50 ? "..." : ""}</p>
            </div>
        </>
    )
}