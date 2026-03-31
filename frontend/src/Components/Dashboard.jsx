import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { JournalInput } from "./JournalInput";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
    const [ entries, setEntries ] = useState([]);
    const [ hasEntryToday, setHasEntryToday ] = useState(false);
    const navigate = useNavigate();

    const fetchEntries = () => {
        fetch("http://localhost:3000/dashboard")
        .then(res => res.json())
        .then(data => {
            setEntries(data.entries)
            setHasEntryToday(data.hasEntryToday)
        })
        .catch(err => console.error(err));
    }
    
    useEffect(() => {
        // fetch logic here I guess ideally
        fetchEntries();
    }, []);

    return (
        <div>
            {hasEntryToday ?  (
            
                <p className="text-2xl m-10 bg-green-200 w-[95%] rounded-lg mx-auto border border-green-300 p-3 text-green-800 text-center">
                    Good Job!! You have logged your entry today.
                </p>
            ) : (
                <JournalInput onSave={fetchEntries} />
            )}
            {entries.map(e => (
                <Card 
                    onClick={ () => navigate(`/entry/${e._id}`) }
                    key={e._id}
                    id={e._id}
                    content={e.preview} 
                    createdAt={e.createdAt} 
                />
            ))}
        </div>
    );
}