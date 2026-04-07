import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { JournalInput } from "./JournalInput";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
    const [ entries, setEntries ] = useState([]);
    const [ hasEntryToday, setHasEntryToday ] = useState(false);
    const [ streak, setStreak ] = useState(0);
    const navigate = useNavigate();

    const fetchEntries = () => {
        fetch("http://localhost:3000/dashboard")
        .then(res => res.json())
        .then(data => {
            setEntries(data.entries)
            setHasEntryToday(data.hasEntryToday)
            setStreak(data.streak);
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
                <div className="text-2xl m-10 bg-green-300 w-[95%] rounded-lg mx-auto border border-green-300 p-3 text-green-800 text-center">
                    { streak === 0 && <p>Start your streak today</p> }
                    { streak === 1 && <p>First Day! Great Job! See you tomorrow😉</p> }
                    { streak > 1 && <p>🔥 {streak}-day streak! Keet it Up!! </p> }
                </div>
            ) : (
                <div>
                    <p>
                        Log your entry today to keep your streak alive!
                    </p>
                    <JournalInput onSave={fetchEntries} />
                </div>
            )}
            {entries.length == 0 ? (
                <p className="text-gray-600 text-center mt-10 text-2xl">
                    No entries yet. Start Journaling today..✍🏻📝
                </p>
            ) : (
                    entries.map(e => (
                        <Card 
                            onClick={ () => navigate(`/entry/${e._id}`) }
                            key={e._id}
                            id={e._id}
                            content={e.preview} 
                            createdAt={e.createdAt} 
                        />
                )
            ))}
        </div>
    );
}