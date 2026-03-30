import React, { useState } from "react";

export function JournalInput(props) {
    const [ content, setContent ] = useState("");
    function getDateAndTime() {
        return new Date().toLocaleString('en-GB');
    }

    const handleSubmit = () => {
        fetch("http://localhost:3000/entry", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ content: content })
        }).then(res => res.json())
        .then(data => {
            console.log("Saved ", data)
            props.onSave();
        })
        .catch(err => {
            console.log("error:" , err);
        });
    };

    return (
        <div className="flex flex-col w-[95%]  border-black p-3 mx-auto m-4 bg-blue-200 rounded">
            <div>{ getDateAndTime() } </div>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write today's entry here"
             />
            <button className="mx-auto rounded-2xl w-20 cursor-pointer hover:bg-blue-300 border" onClick={handleSubmit}>Save</button>
        </div>
    );
}