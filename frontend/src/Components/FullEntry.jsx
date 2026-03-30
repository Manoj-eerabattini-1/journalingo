import react from "react";

export function FullEntry() {
    const [ entry, setEntry ] = useState("");

    const fetchEntry = () => {
        fetch("http://localhost:3000//entry/:id")
        .then(res => res.json())
        .then(data => setEntry(data))
        .catch(err => console.log(err));
    }

    return (
        <div>
            
        </div>
    );
}