import react, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import pencil from "../assets/pencil.png"

export function FullEntry() {
    const { id } = useParams(); 
    const navigate = useNavigate();
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
            <div className="flex justify-between">
                <h2 className="text-2xl font-semibold mb-2">Entry on {new Date(entry.createdAt).toLocaleString("pt-BR")}</h2>
                <button onClick={() => navigate(`/entry/${id}/edit`)} className="border w-8 h-8 flex ml-auto rounded-md text-center p-1 cursor-pointer">
                    <img src={pencil} alt="edit" className="w-5 h-5 justify-center align-middle" />
                </button>
            </div>
            <br></br>
            <p className="whitespace-pre-line">{entry.content}</p>
        </div>
    );
}