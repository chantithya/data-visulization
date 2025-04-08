// src/components/Home.js
import React from 'react';
import "../styles/Home.css";
import Footer from './Footer';
import DataFetcher from './DataFetcher';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
    const [showChart, setShowChart] = React.useState(false);
    const handleClick = () => {
        setShowChart(true);
    }
    
    return (
        <div className='home'>
            <h1>Welcome to the Data Visualization</h1>
            <p>Click the button below to view the chart of our data</p>

            <AnimatePresence>
                {!showChart && (
                    <motion.div
                        key="button"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }} // 🔹 fast transition
                    >
                        <Button onClick={handleClick} className='btn-view-data' variant="primary">
                            View Data
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* {showChart && <DataFetcher/>} */}
            <AnimatePresence>
                {showChart && (
                    <motion.div
                        key="chart"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }} // 🔹 fast transition
                    >
                        <DataFetcher />
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer/>
        </div>
    )
}