import react, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function FullEntry() {
    const { id } = useParams(); 
    const [ entry, setEntry ] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3000/entry/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setEntry(data);
        })
        .catch(err => console.log(err));
    }, [id]);

    if(!entry) return <div>....Loading</div>


    return (
        <div className="w-[95%] mx-auto mt-5 bg-blue-100 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Entry on {new Date(entry.createdAt).toLocaleString("pt-BR")}</h2>
            <br></br>
            <p className="whitespace-pre-line">{entry.content}</p>
        </div>
    );
}