// src/components/Home.js
import React from 'react';
import "../styles/Home.css";
import Footer from './Footer';
import DataFetcher from './DataFetcher';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
    const [showChart, setShowChart] = React.useState(false);
    const handleClick = () => {
        setShowChart(true);
    }
    
    return (
        <div className='home'>
            <h1>Welcome to the Data Visualization</h1>
            <p>Click the button below to view the chart of our data</p>

            {!showChart && (
                <Button onClick={handleClick} className='btn-view-data' variant="primary">View Data</Button>
            )}

            {showChart && <DataFetcher/>}

            <Footer/>
        </div>
    )
}