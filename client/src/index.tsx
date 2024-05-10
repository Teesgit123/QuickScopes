import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';



const SimpleRequestComponent: React.FC = () => {
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
      axios.get<string>('http://localhost:8080/')
        .then(response => setMessage(response.data))
        .catch((error) => {
            console.error('Error fetching the endpoint: ', error);
            setMessage('Failed to fetch data');
        })
        ;
    }, [])

    return (
        <div>
            <p>Server Response: {message}</p>
        </div>
    )
}

const App = () => {
    return (
        <div>
            <h1>Hello World</h1>
            <p>Setup works</p>
            <SimpleRequestComponent />
        </div>
    )
};

ReactDOM.render(<App />, document.getElementById('root'));