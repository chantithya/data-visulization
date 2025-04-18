// src/components/Home.js
import React from 'react';
import "../styles/Home.css";
import Footer from './Footer';
import DataFetcher from './DataFetcher';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion, AnimatePresence } from 'framer-motion';
import "../styles/Home.css"; // Import your CSS file for styling

export default function Home() {
  const [showChart, setShowChart] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowChart(true);
    }, 0); // simulate loading
  };

  return (
    <div className='home'>
      <h1>Welcome to the Data Visualization</h1>
      <p>Click the button below to view the chart of our data</p>

      <AnimatePresence>
        {!showChart && !isLoading && (
          <motion.div
            key="button"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button onClick={handleClick} className='btn-view-data' variant="primary">
              View Data
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔄 Loading Spinner */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="loading-container"
          >
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showChart && (
          <motion.div
            key="chart"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <DataFetcher />
            
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
