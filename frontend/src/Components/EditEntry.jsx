import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function EditEntry() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ content, setContent ] = useState("");


    useEffect(() => {
        fetch(`http://localhost:3000/entry/${id}`)
        .then(res => res.json())
        .then(data => setContent(data.content));
    }, [id]);

    function handleSubmit() {
        fetch(`http://localhost:3000/entry/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({content})
        })
        .then(res => res.json())
        .then(() => {
            navigate(`/entry/${id}`);
        });
    }

    function getDateAndTime() {
        return new Date().toLocaleString('en-GB');
    }

    return (
        <div className="flex flex-col w-[95%]  border-black p-3 mx-auto m-4 bg-blue-200 rounded">
            <div>{ getDateAndTime() } </div>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
             />
            <button className="mx-auto rounded-2xl w-20 cursor-pointer hover:bg-blue-300 border" onClick={handleSubmit}>
                Save
            </button>
        </div>
    );
}