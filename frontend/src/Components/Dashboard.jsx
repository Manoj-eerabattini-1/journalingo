import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { JournalInput } from "./JournalInput";

export function Dashboard() {
    const [ entries, setEntries ] = useState([]);

    const fetchEntries = () => {
        fetch("http://localhost:3000/dashboard")
        .then(res => res.json())
        .then(data => setEntries(data))
        .catch(err => console.error(err));
    }

    useEffect(() => {
        // fetch logic here I guess ideally
        fetchEntries();
    }, []);

    return (
        <div>
            <JournalInput onSave={fetchEntries} />
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